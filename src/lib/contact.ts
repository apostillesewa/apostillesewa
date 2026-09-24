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

export const SITE_URL = "https://apostillesewa.com";

// Default social/share image (1200x630) served from /public.
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

// TODO: replace with the real profile URLs for Apostille Sewa.
// Leave an entry out entirely rather than guessing a URL — a wrong
// sameAs link actively hurts entity matching in search.
export const SAME_AS: string[] = [
  // "https://www.google.com/maps/place/...",      // Google Business Profile
  // "https://www.facebook.com/...",               // Facebook page
  // "https://www.linkedin.com/company/...",       // LinkedIn company page
  "https://www.trustpilot.com/review/apostillesewa.com", // Trustpilot
];
