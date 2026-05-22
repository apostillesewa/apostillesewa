// Central contact constants — single source of truth for phone, email, WhatsApp.
export const PHONE_E164 = "+9779827689960";
export const PHONE_DISPLAY = "+977 982-768-9960";
export const EMAIL = "apostillesewa@gmail.com";

// WhatsApp wants the number without "+" in wa.me links.
export const WHATSAPP_NUMBER = "9779827689960";
export const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export const OFFICE_HOURS = "Kathmandu Hub Open: Sun–Fri, 9 AM – 6 PM";
export const ADDRESS_LINE = "Kathmandu Hub, Nepal";

export const SITE_URL = "https://apostillesewa.lovable.app";
