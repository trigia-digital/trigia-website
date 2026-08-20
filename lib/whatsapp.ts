// Single source of truth for the TRIGIA WhatsApp Business number.
export const WHATSAPP_NUMBER = "6285117320679";

export function buildWhatsAppHref(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
