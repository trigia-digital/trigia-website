// Single source of truth for the TRIGIA WhatsApp Business number.
// TODO: replace with the real number (E.164 digits, no "+" or spaces) once available.
export const WHATSAPP_NUMBER = "62XXXXXXXXXX";

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
