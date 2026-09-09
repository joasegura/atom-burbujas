// Única fuente del número de WhatsApp de AtomIT.
export const WHATSAPP_NUMBER = "5491126678238"

export function buildWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function openWhatsApp(message?: string) {
  window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer")
}
