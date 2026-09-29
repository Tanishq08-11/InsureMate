import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Bot, User, Send, Upload, FileText, Shield, AlertCircle,
    CheckCircle2, XCircle, ArrowLeft, Loader2, Sparkles,
    IndianRupee, Clock, GitCompare, Info,
} from 'lucide-react';
import {
    extractPdfText,
    extractPolicySummary,
    askPolicy,
    estimateTreatmentCost,
    TREATMENT_DATASET,
    buildWaitingTimeline,
    runWhatIf,
} from '../lib/insuremateEngine';

// ============================================================
// SMALL UI ATOMS
// ============================================================

function Pill({ children, tone = 'default' }) {
    const tones = {
        default: 'bg-[#043858]/5 text-[#043858] border-[#043858]/10',
        green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        red: 'bg-red-50 text-red-700 border-red-200',
        yellow: 'bg-amber-50 text-amber-700 border-amber-200',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-mono-x tracking-wider uppercase ${tones[tone]}`}>
            {children}
        </span>
    );
}

function EvidenceChip({ ev }) {
    return (
        <div className="inline-flex items-start gap-2 px-3 py-2 rounded-md bg-[#043858]/5 border border-[#043858]/10 text-[11px] font-mono-x text-[#043858]">
            <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
                <div className="font-semibold">Page {ev.page} · {ev.section}</div>
                {ev.quote && <div className="text-[#526170] italic">"{ev.quote}"</div>}
            </div>
        </div>
    );
}

function Money({ value }) {
    if (value == null) return <span>—</span>;
    return <span>₹{value.toLocaleString('en-IN')}</span>;
}

// ============================================================
// MAIN PAGE
// ============================================================

export default function Chatbot() {
    const [stage, setStage] = useState('upload');
    const [extracted, setExtracted] = useState(null);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    return (
        <div className="min-h-screen bg-[#F7F8FA] font-ui">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Instrument Serif', ui-serif, Georgia, serif; letter-spacing: -0.01em; }
        .font-ui { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        .font-mono-x { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

            <header className="bg-white border-b border-[#E4E7EC] sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-[#043858] hover:opacity-80">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-display text-xl">InsureMate</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        {summary && (
                            <Pill tone="green">
                                <CheckCircle2 className="w-3 h-3" />
                                Policy loaded
                            </Pill>
                        )}
                        <span className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#526170]">
                            AI Insurance Chatbot
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <div>
                            <div className="font-semibold">Something went wrong</div>
                            <div className="text-red-700">{error}</div>
                        </div>
                    </div>
                )}

                {stage === 'upload' && (
                    <UploadStage
                        onParsed={(ex, sum) => {
                            setExtracted(ex);
                            setSummary(sum);
                            setStage('ready');
                        }}
                        onError={(e) => {
                            setError(e.message || String(e));
                            setStage('upload');
                        }}
                        onProgress={() => setStage('parsing')}
                    />
                )}

                {stage === 'parsing' && <ParsingStage />}

                {stage === 'ready' && extracted && summary && (
                    <ReadyStage
                        extracted={extracted}
                        summary={summary}
                        onReset={() => {
                            setExtracted(null);
                            setSummary(null);
                            setStage('upload');
                            setError(null);
                        }}
                    />
                )}
            </main>
        </div>
    );
}

// ============================================================
// STAGE 1 — UPLOAD
// ============================================================

function UploadStage({ onParsed, onError, onProgress }) {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const inputRef = useRef(null);

    async function handleProcess() {
        if (!file) return;
        try {
            onProgress();
            const ex = await extractPdfText(file);
            const sum = await extractPolicySummary(ex);
            if (!sum) throw new Error('Could not extract a policy summary from this PDF.');
            onParsed(ex, sum);
        } catch (e) {
            console.error(e);
            onError(e);
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3 pt-6">
                <Pill>Step 1 of 3</Pill>
                <h1 className="font-display text-4xl sm:text-5xl text-[#043858] tracking-[-0.02em]">
                    Upload your insurance policy
                </h1>
                <p className="text-[#526170] max-w-xl mx-auto">
                    We'll read the PDF, extract the important clauses, and let you ask
                    anything about it in plain English — with page-level evidence.
                </p>
            </div>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    const f = e.dataTransfer.files?.[0];
                    if (f && f.type === 'application/pdf') setFile(f);
                    else onError(new Error('Please drop a PDF file.'));
                }}
                onClick={() => inputRef.current?.click()}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${dragging
                        ? 'border-[#7DD3C0] bg-[#7DD3C0]/5'
                        : 'border-[#E4E7EC] bg-white hover:border-[#043858]/30'
                    }`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setFile(f);
                    }}
                />

                <div className="w-16 h-16 rounded-2xl bg-[#043858]/5 flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-7 h-7 text-[#043858]" />
                </div>

                {file ? (
                    <>
                        <div className="font-display text-xl text-[#043858]">{file.name}</div>
                        <div className="text-xs text-[#526170] mt-1 font-mono-x">
                            {(file.size / 1024).toFixed(1)} KB · PDF
                        </div>
                    </>
                ) : (
                    <>
                        <div className="font-display text-xl text-[#043858]">
                            Drop your policy PDF here
                        </div>
                        <div className="text-sm text-[#526170] mt-1">or click to browse</div>
                    </>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                    onClick={handleProcess}
                    disabled={!file}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#043858] text-white font-semibold text-[15px] hover:bg-[#032c46] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                    <Sparkles className="w-4 h-4" />
                    Analyse Policy
                </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-4 text-[11px] font-mono-x tracking-wider uppercase text-[#526170]">
                <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#7DD3C0]" /> Private</span>
                <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#7DD3C0]" /> Page-level evidence</span>
                <span className="flex items-center gap-2"><Bot className="w-3.5 h-3.5 text-[#7DD3C0]" /> Grounded AI</span>
            </div>
        </div>
    );
}

// ============================================================
// STAGE 2 — PARSING
// ============================================================

function ParsingStage() {
    const steps = [
        'Reading PDF pages…',
        'Extracting clauses and sub-limits…',
        'Building structured policy summary…',
        'Preparing evidence index…',
    ];
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((x) => Math.min(x + 1, steps.length - 1)), 1200);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="max-w-xl mx-auto pt-24 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#043858] flex items-center justify-center mx-auto">
                <Loader2 className="w-7 h-7 text-[#7DD3C0] animate-spin" />
            </div>
            <h2 className="font-display text-3xl text-[#043858]">Analysing your policy…</h2>
            <div className="space-y-2 text-left bg-white border border-[#E4E7EC] rounded-xl p-5">
                {steps.map((s, idx) => (
                    <div key={s} className="flex items-center gap-3 text-sm">
                        {idx < i ? (
                            <CheckCircle2 className="w-4 h-4 text-[#7DD3C0]" />
                        ) : idx === i ? (
                            <Loader2 className="w-4 h-4 text-[#043858] animate-spin" />
                        ) : (
                            <div className="w-4 h-4 rounded-full border border-[#E4E7EC]" />
                        )}
                        <span className={idx <= i ? 'text-[#043858]' : 'text-[#526170]'}>{s}</span>
                    </div>
                ))}
            </div>
            <p className="text-xs text-[#526170] font-mono-x">
                This can take 20–40 seconds depending on the policy size.
            </p>
        </div>
    );
}

// ============================================================
// STAGE 3 — READY
// ============================================================

function ReadyStage({ extracted, summary, onReset }) {
    const [tab, setTab] = useState('summary');

    const tabs = [
        { id: 'summary', label: 'Summary', icon: FileText },
        { id: 'chat', label: 'Chat', icon: Bot },
        { id: 'cost', label: 'Cost Estimate', icon: IndianRupee },
        { id: 'timeline', label: 'Waiting Periods', icon: Clock },
        { id: 'whatif', label: 'What-If', icon: GitCompare },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="font-mono-x text-[10px] tracking-[0.2em] uppercase text-[#7DD3C0] font-semibold mb-1">
                        Policy loaded
                    </div>
                    <h1 className="font-display text-2xl text-[#043858]">
                        {summary.policyName || 'Insurance Policy'}
                        {summary.insurer && <span className="text-[#526170]"> · {summary.insurer}</span>}
                    </h1>
                    <div className="text-xs text-[#526170] mt-1 font-mono-x">
                        {extracted.numPages} pages indexed · Ready for questions
                    </div>
                </div>
                <button
                    onClick={onReset}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E4E7EC] text-[#043858] text-sm font-semibold hover:bg-[#F7F8FA] transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    Upload another
                </button>
            </div>

            <div className="border-b border-[#E4E7EC] overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                    {tabs.map((t) => {
                        const Icon = t.icon;
                        const active = tab === t.id;
                        return (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${active
                                        ? 'border-[#043858] text-[#043858]'
                                        : 'border-transparent text-[#526170] hover:text-[#043858]'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {t.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {tab === 'summary' && <SummaryTab summary={summary} />}
            {tab === 'chat' && <ChatTab extracted={extracted} summary={summary} />}
            {tab === 'cost' && <CostTab summary={summary} />}
            {tab === 'timeline' && <TimelineTab summary={summary} />}
            {tab === 'whatif' && <WhatIfTab summary={summary} />}
        </div>
    );
}

// ============================================================
// TAB: SUMMARY
// ============================================================

function SummaryTab({ summary }) {
    const items = [
        { label: 'Sum Insured', value: summary.sumInsured },
        { label: 'Policy Duration', value: summary.policyDuration },
        { label: 'Co-Pay', value: summary.coPay },
        { label: 'Deductibles', value: summary.deductibles },
        { label: 'Room-Rent Limit', value: summary.roomRentLimit },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((it) => (
                    <div key={it.label} className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-2">
                        <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                            {it.label}
                        </div>
                        <div className="font-display text-xl text-[#043858]">
                            {it.value || <span className="text-[#526170] text-base">Not specified</span>}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-3">
                    <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                        Waiting Periods
                    </div>
                    {(summary.waitingPeriods || []).length === 0 ? (
                        <div className="text-sm text-[#526170]">None found in the policy.</div>
                    ) : (
                        <ul className="space-y-2">
                            {summary.waitingPeriods.map((w, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                    <Clock className="w-4 h-4 text-[#043858] mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[#043858] font-medium">{w.condition}</div>
                                        <div className="text-[#526170] text-xs">
                                            {w.duration}{w.page ? ` · Page ${w.page}` : ''}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-3">
                    <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                        Major Exclusions
                    </div>
                    {(summary.majorExclusions || []).length === 0 ? (
                        <div className="text-sm text-[#526170]">None found in the policy.</div>
                    ) : (
                        <ul className="space-y-2">
                            {summary.majorExclusions.map((e, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm">
                                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[#043858] font-medium">{e.item}</div>
                                        {e.page && <div className="text-[#526170] text-xs">Page {e.page}</div>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-3 lg:col-span-2">
                    <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                        Sub-Limits
                    </div>
                    {(summary.subLimits || []).length === 0 ? (
                        <div className="text-sm text-[#526170]">None found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {summary.subLimits.map((s, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm p-3 bg-[#F7F8FA] rounded-lg">
                                    <Info className="w-4 h-4 text-[#043858] mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-[#043858] font-medium">{s.treatment}</div>
                                        <div className="text-[#526170] text-xs">
                                            {s.limit}{s.page ? ` · Page ${s.page}` : ''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ============================================================
// TAB: CHAT
// ============================================================

function ChatTab({ extracted, summary }) {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "Hi! I've read your policy. Ask me anything — coverage, waiting periods, sub-limits, exclusions, or treatment costs.",
            evidence: [],
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, loading]);

    const suggestions = [
        'Is knee replacement covered?',
        'What is my waiting period?',
        'What is my room-rent limit?',
        'What is excluded from my policy?',
    ];

    async function send(q) {
        const question = (q ?? input).trim();
        if (!question || loading) return;

        const nextMessages = [...messages, { role: 'user', content: question }];
        setMessages(nextMessages);
        setInput('');
        setLoading(true);

        try {
            const history = nextMessages.map((m) => ({ role: m.role, content: m.content }));
            const res = await askPolicy({ extracted, summary, question, history });

            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: res.answer,
                    evidence: res.evidence || [],
                    insufficient: res.insufficient,
                    followUp: res.followUp,
                },
            ]);
        } catch (e) {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: `Sorry — I hit an error: ${e.message}`,
                    evidence: [],
                    insufficient: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E7EC] flex flex-col h-[640px] overflow-hidden">
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#F7F8FA]"
                >
                    {messages.map((m, i) => (
                        <MessageBubble key={i} message={m} />
                    ))}
                    {loading && (
                        <div className="flex items-center gap-2 text-[#526170] text-sm">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Reading your policy…
                        </div>
                    )}
                </div>

                <div className="border-t border-[#E4E7EC] p-3 bg-white flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && send()}
                        placeholder="Ask anything about your policy…"
                        className="flex-1 px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:border-[#043858]/40"
                    />
                    <button
                        onClick={() => send()}
                        disabled={loading || !input.trim()}
                        className="w-11 h-11 rounded-lg bg-[#043858] text-white flex items-center justify-center hover:bg-[#032c46] disabled:opacity-40 transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                    Try asking
                </div>
                {suggestions.map((s) => (
                    <button
                        key={s}
                        onClick={() => send(s)}
                        disabled={loading}
                        className="w-full text-left p-4 bg-white border border-[#E4E7EC] rounded-xl text-sm text-[#043858] hover:border-[#043858]/30 hover:bg-[#F7F8FA] transition-colors disabled:opacity-50"
                    >
                        "{s}"
                    </button>
                ))}
                <div className="p-4 bg-[#043858]/5 border border-[#043858]/10 rounded-xl text-xs text-[#526170] leading-relaxed">
                    Every answer is grounded in your uploaded policy, with page-level evidence shown next to the reply.
                </div>
            </div>
        </div>
    );
}

function MessageBubble({ message }) {
    const isUser = message.role === 'user';
    return (
        <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#043858] flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#7DD3C0]" />
                </div>
            )}
            <div className={`max-w-[85%] space-y-2 ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                    className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isUser
                            ? 'bg-[#043858] text-white rounded-tr-md'
                            : 'bg-white text-[#172033] border border-[#E4E7EC] rounded-tl-md'
                        }`}
                >
                    {message.content}
                </div>

                {message.evidence?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {message.evidence.map((ev, i) => (
                            <EvidenceChip key={i} ev={ev} />
                        ))}
                    </div>
                )}

                {message.followUp && (
                    <div className="text-xs text-[#526170] italic">{message.followUp}</div>
                )}

                {message.insufficient && !message.followUp && (
                    <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md">
                        Not found in the policy — try rephrasing or check the Summary tab.
                    </div>
                )}
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#E4E7EC] flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4 text-[#526170]" />
                </div>
            )}
        </div>
    );
}

// ============================================================
// TAB: COST ESTIMATE
// ============================================================

function CostTab({ summary }) {
    const [treatment, setTreatment] = useState('');
    const [tier, setTier] = useState('mid');
    const [result, setResult] = useState(null);

    function run() {
        if (!treatment) return;
        const r = estimateTreatmentCost({ treatment, summary, hospitalTier: tier });
        setResult(r);
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 space-y-4">
                <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                    Treatment Cost Estimate
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        className="md:col-span-2 px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm bg-white focus:outline-none focus:border-[#043858]/40"
                    >
                        <option value="">Select a treatment…</option>
                        {Object.keys(TREATMENT_DATASET).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    <select
                        value={tier}
                        onChange={(e) => setTier(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm bg-white focus:outline-none focus:border-[#043858]/40"
                    >
                        <option value="budget">Budget hospital</option>
                        <option value="mid">Mid-tier hospital</option>
                        <option value="premium">Premium hospital</option>
                    </select>
                </div>
                <button
                    onClick={run}
                    disabled={!treatment}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#043858] text-white font-semibold text-sm hover:bg-[#032c46] disabled:opacity-40 transition-colors"
                >
                    <IndianRupee className="w-4 h-4" />
                    Estimate
                </button>
            </div>

            {result && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard label="Expected Cost" value={<Money value={result.expectedCost} />} />
                        <StatCard label="Potentially Covered" value={<Money value={result.potentiallyCovered} />} tone="green" />
                        <StatCard label="Approx. Out-of-Pocket" value={<Money value={result.outOfPocket} />} tone="red" />
                        <StatCard label="Co-Pay Applied" value={`${Math.round(result.coPayPct * 100)}%`} />
                    </div>

                    <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-2">
                        <div className="text-sm text-[#526170]">
                            Typical range: <Money value={result.range[0]} /> – <Money value={result.range[1]} />
                        </div>
                        <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <span>{result.disclaimer}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function StatCard({ label, value, tone = 'default' }) {
    const tones = {
        default: 'text-[#043858]',
        green: 'text-emerald-600',
        red: 'text-red-600',
    };
    return (
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-2">
            <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                {label}
            </div>
            <div className={`font-display text-2xl ${tones[tone]}`}>{value}</div>
        </div>
    );
}

// ============================================================
// TAB: WAITING PERIOD TIMELINE
// ============================================================

function TimelineTab({ summary }) {
    const [months, setMonths] = useState(0);
    const timeline = buildWaitingTimeline(summary, months);

    const totalMonths = Math.max(
        48,
        ...timeline.map((t) => t.endMonths || 48)
    );

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 space-y-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                        <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                            Waiting Period Time Machine
                        </div>
                        <div className="font-display text-xl text-[#043858] mt-1">
                            Month {months} since policy start
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono-x">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500" /> Active</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-400" /> Limited</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-500" /> Covered</span>
                    </div>
                </div>

                <input
                    type="range"
                    min={0}
                    max={totalMonths}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="w-full accent-[#043858]"
                />
            </div>

            {timeline.length === 0 ? (
                <div className="bg-white rounded-xl border border-[#E4E7EC] p-6 text-sm text-[#526170]">
                    No waiting periods were found in this policy.
                </div>
            ) : (
                <div className="space-y-4">
                    {timeline.map((t, i) => (
                        <TimelineRow key={i} item={t} currentMonth={months} totalMonths={totalMonths} />
                    ))}
                </div>
            )}
        </div>
    );
}

function TimelineRow({ item, currentMonth, totalMonths }) {
    const end = item.endMonths || totalMonths;
    const pct = (end / totalMonths) * 100;
    const cursorPct = (currentMonth / totalMonths) * 100;

    const barColor =
        item.phase === 'red' ? 'bg-red-500'
            : item.phase === 'yellow' ? 'bg-amber-400'
                : 'bg-emerald-500';

    const statusLabel =
        item.phase === 'red' ? 'WAITING PERIOD ACTIVE'
            : item.phase === 'yellow' ? 'CONDITIONAL / LIMITED'
                : 'WAITING COMPLETE';

    const statusTone =
        item.phase === 'red' ? 'red'
            : item.phase === 'yellow' ? 'yellow'
                : 'green';

    return (
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 space-y-3">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                    <div className="font-medium text-[#043858]">{item.condition}</div>
                    <div className="text-xs text-[#526170]">
                        {item.duration}{item.page ? ` · Page ${item.page}` : ''}
                    </div>
                </div>
                <Pill tone={statusTone}>{statusLabel}</Pill>
            </div>

            <div className="relative h-3 rounded-full bg-[#F7F8FA] border border-[#E4E7EC] overflow-hidden">
                <div className={`absolute inset-y-0 left-0 ${barColor} opacity-90`} style={{ width: `${pct}%` }} />
                <div
                    className="absolute top-[-4px] bottom-[-4px] w-[2px] bg-[#043858]"
                    style={{ left: `${cursorPct}%` }}
                />
            </div>

            <div className="flex justify-between text-[10px] font-mono-x text-[#526170] uppercase">
                <span>Month 0</span>
                <span>Month {Math.round(end)}</span>
            </div>
        </div>
    );
}

// ============================================================
// TAB: WHAT-IF
// ============================================================

function WhatIfTab({ summary }) {
    const [treatment, setTreatment] = useState('');
    const [sumInsured, setSumInsured] = useState('');
    const [roomRentLimit, setRoomRentLimit] = useState('');
    const [coPay, setCoPay] = useState('');
    const [result, setResult] = useState(null);

    function run() {
        if (!treatment) return;
        const r = runWhatIf({
            base: summary,
            overrides: { sumInsured, roomRentLimit, coPay },
            treatment,
            hospitalTier: 'mid',
        });
        setResult(r);
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 space-y-4">
                <div className="font-mono-x text-[10px] tracking-[0.18em] uppercase text-[#7DD3C0] font-semibold">
                    What-If Simulation
                </div>
                <p className="text-sm text-[#526170]">
                    Change one or more variables to see how coverage and out-of-pocket would shift. Your original policy is never modified.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm bg-white focus:outline-none focus:border-[#043858]/40 md:col-span-2"
                    >
                        <option value="">Select a treatment…</option>
                        {Object.keys(TREATMENT_DATASET).map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>

                    <input
                        value={sumInsured}
                        onChange={(e) => setSumInsured(e.target.value)}
                        placeholder="Sum insured (e.g. 10L)"
                        className="px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:border-[#043858]/40"
                    />
                    <input
                        value={roomRentLimit}
                        onChange={(e) => setRoomRentLimit(e.target.value)}
                        placeholder="Room-rent limit (e.g. 1% SI)"
                        className="px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:border-[#043858]/40"
                    />
                    <input
                        value={coPay}
                        onChange={(e) => setCoPay(e.target.value)}
                        placeholder="Co-pay (e.g. 20%)"
                        className="px-4 py-3 rounded-lg border border-[#E4E7EC] text-sm focus:outline-none focus:border-[#043858]/40 md:col-span-2"
                    />
                </div>

                <button
                    onClick={run}
                    disabled={!treatment}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#043858] text-white font-semibold text-sm hover:bg-[#032c46] disabled:opacity-40 transition-colors"
                >
                    <GitCompare className="w-4 h-4" />
                    Compare
                </button>
            </div>

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CompareCard title="Current Policy" data={result.baseline} tone="default" />
                    <CompareCard title="What-If Scenario" data={result.whatIf} tone="accent" />
                </div>
            )}
        </div>
    );
}

function CompareCard({ title, data, tone = 'default' }) {
    if (!data) return null;
    const isAccent = tone === 'accent';
    return (
        <div className={`rounded-2xl border p-6 space-y-4 ${isAccent
                ? 'bg-[#043858] text-white border-[#043858]'
                : 'bg-white border-[#E4E7EC]'
            }`}>
            <div className={`font-mono-x text-[10px] tracking-[0.18em] uppercase font-semibold ${isAccent ? 'text-[#7DD3C0]' : 'text-[#7DD3C0]'
                }`}>
                {title}
            </div>
            <div className="space-y-3 text-sm">
                <CompareRow label="Expected cost" value={<Money value={data.expectedCost} />} isAccent={isAccent} />
                <CompareRow label="Sum insured" value={<Money value={data.sumInsured} />} isAccent={isAccent} />
                <CompareRow label="Co-pay" value={`${Math.round(data.coPayPct * 100)}%`} isAccent={isAccent} />
                <CompareRow label="Potentially covered" value={<Money value={data.potentiallyCovered} />} isAccent={isAccent} highlight />
                <CompareRow label="Out-of-pocket" value={<Money value={data.outOfPocket} />} isAccent={isAccent} highlight />
            </div>
        </div>
    );
}

function CompareRow({ label, value, isAccent, highlight }) {
    return (
        <div className={`flex items-center justify-between gap-3 py-2 border-b last:border-b-0 ${isAccent ? 'border-white/15' : 'border-[#E4E7EC]'
            }`}>
            <span className={isAccent ? 'text-white/70' : 'text-[#526170]'}>{label}</span>
            <span className={`font-semibold ${highlight ? (isAccent ? 'text-[#7DD3C0]' : 'text-[#043858]') : (isAccent ? 'text-white' : 'text-[#043858]')}`}>
                {value}
            </span>
        </div>
    );
}