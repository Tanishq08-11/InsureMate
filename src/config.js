/**
 * InsureMate Real WhatsApp Business Integration Configuration
 * 
 * Set your REAL Meta WhatsApp Business phone number in .env:
 * VITE_WHATSAPP_PHONE=15550234567   (or your India number: 919XXXXXXXXX)
 * 
 * Rules:
 * 1. Must be the exact registered Meta WhatsApp Cloud API Test/Business Phone Number.
 * 2. Country code + Number without '+', '-', or spaces.
 */

const configuredPhone = import.meta.env.VITE_WHATSAPP_PHONE;

if (!configuredPhone) {
  console.warn(
    "[InsureMate Config] VITE_WHATSAPP_PHONE is not set in .env. " +
    "Please add VITE_WHATSAPP_PHONE=<your_real_meta_whatsapp_number> to your .env file."
  );
}

export const WHATSAPP_CONFIG = {
  // Real registered Meta WhatsApp Cloud API Phone Number
  phoneNumber: configuredPhone || '',
  
  // Official Pre-filled message
  defaultMessage: 'Hi InsureMate, I want to understand my insurance policy.',
  
  // Generates the official WhatsApp Click-to-Chat URL
  getChatUrl(customMessage) {
    if (!this.phoneNumber) {
      // If not configured, return direct WhatsApp URL anchor with configuration reminder
      return `https://wa.me/?text=${encodeURIComponent(customMessage || this.defaultMessage)}`;
    }
    const message = customMessage || this.defaultMessage;
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
  }
};

export const getWhatsAppUrl = () => WHATSAPP_CONFIG.getChatUrl();
