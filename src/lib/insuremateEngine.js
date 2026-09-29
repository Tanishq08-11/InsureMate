// ============================================================
// InsureMate Engine — AI + Policy Logic
// ============================================================

import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '';
const LLM_BASE_URL =
    import.meta.env.VITE_LLM_BASE_URL || 'https://openrouter.ai/api/v1';
const LLM_MODEL = import.meta.env.VITE_LLM_MODEL || 'openai/gpt-4o-mini';

// ---------------- PDF EXTRACTION ----------------

export async function extractPdfText(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pages = [];
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const text = content.items.map((it) => it.str).join(' ');
        pages.push({ pageNumber: i, text: text.trim() });
    }

    return {
        pages,
        fullText: pages.map((p) => `[PAGE ${p.pageNumber}]\n${p.text}`).join('\n\n'),
        numPages: pdf.numPages,
    };
}

// ---------------- POLICY SUMMARY ----------------

const SUMMARY_SYSTEM_PROMPT = `You are an insurance policy parser. You will receive the full text of an insurance policy PDF (with [PAGE N] markers).
Extract a structured JSON summary. If a field is not found in the document, use null (do NOT guess).

Return ONLY valid JSON matching this schema:
{
  "insurer": string | null,
  "policyName": string | null,
  "sumInsured": string | null,
  "policyDuration": string | null,
  "waitingPeriods": [
    { "condition": string, "duration": string, "page": number | null }
  ],
  "coPay": string | null,
  "deductibles": string | null,
  "roomRentLimit": string | null,
  "majorExclusions": [
    { "item": string, "page": number | null }
  ],
  "subLimits": [
    { "treatment": string, "limit": string, "page": number | null }
  ]
}`;

export async function extractPolicySummary(extracted) {
    const userPrompt = `Here is the full policy text:\n\n${truncate(extracted.fullText, 60000)}`;

    const raw = await callLLM({
        system: SUMMARY_SYSTEM_PROMPT,
        user: userPrompt,
        jsonMode: true,
    });

    try {
        return JSON.parse(stripJsonFence(raw));
    } catch (e) {
        console.error('Failed to parse policy summary JSON', raw);
        return null;
    }
}

// ---------------- CHAT ----------------

const CHAT_SYSTEM_PROMPT = `You are InsureMate, an AI assistant that answers questions about a user's specific insurance policy.

RULES:
1. Answer ONLY from the provided policy text. Never invent clauses or numbers.
2. Every factual claim MUST be backed by an evidence array entry with page number + section title.
3. If the answer is not present in the policy text, set "insufficient": true and ask a clarifying question in "answer".
4. Never give medical advice. Only explain policy coverage, waiting periods, sub-limits, co-pay, exclusions.
5. Keep answers clear and in plain English.

Return ONLY valid JSON:
{
  "answer": string,
  "evidence": [
    { "page": number, "section": string, "quote": string }
  ],
  "insufficient": boolean,
  "followUp": string | null
}`;

export async function askPolicy({ extracted, summary, question, history }) {
    const historyBlock = (history || [])
        .slice(-6)
        .map((m) => `${m.role === 'user' ? 'USER' : 'ASSISTANT'}: ${m.content}`)
        .join('\n');

    const userPrompt = `POLICY SUMMARY (structured):
${JSON.stringify(summary, null, 2)}

POLICY FULL TEXT (with [PAGE N] markers):
${truncate(extracted.fullText, 60000)}

CONVERSATION SO FAR:
${historyBlock || '(none)'}

USER QUESTION: ${question}

Answer using ONLY the policy text above.`;

    const raw = await callLLM({
        system: CHAT_SYSTEM_PROMPT,
        user: userPrompt,
        jsonMode: true,
    });

    try {
        return JSON.parse(stripJsonFence(raw));
    } catch (e) {
        return {
            answer: raw || 'Sorry, I could not process that.',
            evidence: [],
            insufficient: true,
            followUp: null,
        };
    }
}

// ---------------- TREATMENT COST ----------------

export const TREATMENT_DATASET = {
    'Knee Replacement': { avg: 350000, range: [250000, 500000], typicalStay: 5 },
    'Cataract Surgery': { avg: 60000, range: [30000, 120000], typicalStay: 1 },
    'Angioplasty': { avg: 250000, range: [150000, 400000], typicalStay: 3 },
    'Coronary Bypass (CABG)': { avg: 500000, range: [350000, 700000], typicalStay: 7 },
    'Appendectomy': { avg: 90000, range: [60000, 150000], typicalStay: 3 },
    'Hernia Repair': { avg: 80000, range: [50000, 130000], typicalStay: 2 },
    'Gallbladder Removal': { avg: 110000, range: [70000, 180000], typicalStay: 3 },
    'Dialysis (per session)': { avg: 3000, range: [2000, 5000], typicalStay: 0 },
    'Chemotherapy (cycle)': { avg: 80000, range: [40000, 200000], typicalStay: 0 },
    'Maternity (Normal)': { avg: 60000, range: [40000, 100000], typicalStay: 3 },
    'Maternity (C-Section)': { avg: 100000, range: [70000, 180000], typicalStay: 4 },
};

export function parseRupees(str) {
    if (!str) return null;
    const s = String(str).toLowerCase().replace(/[₹,\s]/g, '');
    const lakhMatch = s.match(/(\d+(?:\.\d+)?)\s*(l|lakh|lakhs)/);
    if (lakhMatch) return parseFloat(lakhMatch[1]) * 100000;
    const croreMatch = s.match(/(\d+(?:\.\d+)?)\s*(cr|crore|crores)/);
    if (croreMatch) return parseFloat(croreMatch[1]) * 10000000;
    const num = s.match(/\d+/);
    return num ? parseInt(num[0], 10) : null;
}

function parseCoPayPct(str) {
    if (!str) return 0;
    const m = String(str).match(/(\d+(?:\.\d+)?)\s*%/);
    return m ? parseFloat(m[1]) / 100 : 0;
}

export function estimateTreatmentCost({ treatment, summary, hospitalTier = 'mid' }) {
    const data = TREATMENT_DATASET[treatment];
    if (!data) return null;

    const tierMultiplier = hospitalTier === 'premium' ? 1.4 : hospitalTier === 'budget' ? 0.7 : 1;
    const expectedCost = Math.round(data.avg * tierMultiplier);

    const sumInsured = parseRupees(summary?.sumInsured) || 0;
    const coPayPct = parseCoPayPct(summary?.coPay);

    const afterSumInsured = Math.min(expectedCost, sumInsured || expectedCost);
    const coPayAmount = Math.round(afterSumInsured * coPayPct);
    const potentiallyCovered = Math.max(0, afterSumInsured - coPayAmount);
    const outOfPocket = expectedCost - potentiallyCovered;

    return {
        treatment,
        expectedCost,
        range: [Math.round(data.range[0] * tierMultiplier), Math.round(data.range[1] * tierMultiplier)],
        sumInsured,
        coPayPct,
        coPayAmount,
        potentiallyCovered,
        outOfPocket,
        roomRentLimit: summary?.roomRentLimit || '',
        hospitalTier,
        disclaimer:
            'These are approximate benchmarks for Indian hospitals. Actual bills vary by city, hospital, and surgeon. Always confirm with your hospital.',
    };
}

// ---------------- WAITING PERIOD TIMELINE ----------------

function parseDurationMonths(str) {
    if (!str) return null;
    const s = String(str).toLowerCase();
    const yMatch = s.match(/(\d+(?:\.\d+)?)\s*(year|yr|y)/);
    if (yMatch) return parseFloat(yMatch[1]) * 12;
    const mMatch = s.match(/(\d+(?:\.\d+)?)\s*(month|mo|m)/);
    if (mMatch) return parseFloat(mMatch[1]);
    return null;
}

export function buildWaitingTimeline(summary, monthsSinceStart = 0) {
    const wp = summary?.waitingPeriods || [];
    return wp.map((w) => {
        const endMonths = parseDurationMonths(w.duration);
        let phase = 'green';
        if (endMonths == null) phase = 'yellow';
        else if (monthsSinceStart < endMonths * 0.5) phase = 'red';
        else if (monthsSinceStart < endMonths) phase = 'yellow';

        return {
            condition: w.condition,
            duration: w.duration,
            startMonths: 0,
            endMonths: endMonths ?? 48,
            page: w.page,
            phase,
        };
    });
}

// ---------------- WHAT-IF ----------------

export function runWhatIf({ base, overrides, treatment, hospitalTier }) {
    const scenarioSummary = {
        ...base,
        ...(overrides.sumInsured ? { sumInsured: overrides.sumInsured } : {}),
        ...(overrides.roomRentLimit ? { roomRentLimit: overrides.roomRentLimit } : {}),
        ...(overrides.coPay ? { coPay: overrides.coPay } : {}),
    };

    const baseline = estimateTreatmentCost({ treatment, summary: base, hospitalTier });
    const whatIf = estimateTreatmentCost({ treatment, summary: scenarioSummary, hospitalTier });

    return { baseline, whatIf, scenarioSummary };
}

// ---------------- LLM CALL ----------------

async function callLLM({ system, user, jsonMode = false }) {
    if (!OPENROUTER_API_KEY) {
        throw new Error(
            'Missing VITE_OPENROUTER_API_KEY. Add it to your .env and restart the dev server.'
        );
    }

    const body = {
        model: LLM_MODEL,
        messages: [
            { role: 'system', content: system },
            { role: 'user', content: user },
        ],
        temperature: 0.2,
        ...(jsonMode ? { response_format: { type: 'json_object' } } : {}),
    };

    const res = await fetch(`${LLM_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'InsureMate',
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errText = await res.text();
        throw new Error(`LLM error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
}

// ---------------- UTILS ----------------

function stripJsonFence(s) {
    return s.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
}

function truncate(s, n) {
    if (!s) return '';
    return s.length > n ? s.slice(0, n) + '\n…[truncated]' : s;
}