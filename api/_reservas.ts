/**
 * Lógica de la función /api/reservas, separada del handler de Vercel para poder probarla.
 *
 * Flujo: valida igual que el frontend → avisa por Telegram → reenvía a n8n (opcional, con
 * timeout corto). La reserva se confirma si llegó al menos por un canal; si n8n no responde
 * pero Telegram sí, queda confirmada igual.
 */
import { validateReservation, type ReservationData, type ReservationErrors } from '../src/lib/validateReservation.js'

export interface Entorno {
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  N8N_WEBHOOK_URL?: string
}

export interface Resultado {
  status: number
  body: { ok: true; canales: string[] } | { ok: false; error: string; campos?: ReservationErrors }
}

type Fetch = typeof fetch

const TIMEOUT_TELEGRAM_MS = 6000
const TIMEOUT_N8N_MS = 2500
const ZONA = 'America/Asuncion'

/** "Hoy" en Paraguay, como fecha local: el servidor corre en UTC y de noche ya sería mañana. */
export function hoyEnAsuncion(ahora: Date = new Date()): Date {
  const partes = new Intl.DateTimeFormat('en-CA', { timeZone: ZONA, year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(ahora)
  const n = (t: string) => Number(partes.find((p) => p.type === t)?.value)
  return new Date(n('year'), n('month') - 1, n('day'))
}

/** Convierte el cuerpo recibido en una reserva con tipos seguros (nunca confía en el navegador). */
export function normalizar(cuerpo: unknown): ReservationData | null {
  if (!cuerpo || typeof cuerpo !== 'object') return null
  const c = cuerpo as Record<string, unknown>
  const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  return {
    name: texto(c.name, 80),
    email: texto(c.email, 120),
    date: /^\d{4}-\d{2}-\d{2}$/.test(texto(c.date, 10)) ? texto(c.date, 10) : '',
    time: /^\d{2}:\d{2}$/.test(texto(c.time, 5)) ? texto(c.time, 5) : '',
    people: typeof c.people === 'number' ? c.people : Number.NaN,
  }
}

function fechaLarga(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long', timeZone: ZONA })
}

export function mensajeTelegram(r: ReservationData): string {
  return [
    '☕ Nueva reserva · Nativa Café',
    '',
    `👤 ${r.name}`,
    `📅 ${fechaLarga(r.date)} a las ${r.time}`,
    `🪑 ${r.people} ${r.people === 1 ? 'persona' : 'personas'}`,
    `✉️ ${r.email}`,
    '',
    'Respondé al cliente por email para confirmar.',
  ].join('\n')
}

async function avisarTelegram(r: ReservationData, env: Entorno, f: Fetch): Promise<boolean> {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return false
  try {
    const res = await f(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text: mensajeTelegram(r), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(TIMEOUT_TELEGRAM_MS),
    })
    return res.ok
  } catch {
    return false
  }
}

async function reenviarN8n(r: ReservationData, env: Entorno, f: Fetch): Promise<boolean> {
  if (!env.N8N_WEBHOOK_URL) return false
  try {
    const res = await f(env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...r, origen: 'nativacafe-web' }),
      signal: AbortSignal.timeout(TIMEOUT_N8N_MS),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function procesarReserva(cuerpo: unknown, env: Entorno, f: Fetch = fetch, ahora = new Date()): Promise<Resultado> {
  // Campo trampa: los humanos no lo ven; si viene completo es un bot. Se responde "ok" sin avisar a nadie.
  if (cuerpo && typeof cuerpo === 'object' && (cuerpo as Record<string, unknown>).empresa) {
    return { status: 200, body: { ok: true, canales: [] } }
  }

  const reserva = normalizar(cuerpo)
  if (!reserva) return { status: 400, body: { ok: false, error: 'Los datos de la reserva no llegaron bien. Recargá la página y probá de nuevo.' } }

  const campos = validateReservation(reserva, hoyEnAsuncion(ahora))
  if (Object.keys(campos).length > 0) {
    return { status: 422, body: { ok: false, error: 'Revisá los datos marcados.', campos } }
  }

  if (!env.TELEGRAM_BOT_TOKEN && !env.N8N_WEBHOOK_URL) {
    return { status: 503, body: { ok: false, error: 'Las reservas online no están configuradas todavía. Reservá por WhatsApp.' } }
  }

  // Telegram primero (es el aviso que siempre funciona), después n8n en paralelo con timeout corto
  const [telegram, n8n] = await Promise.all([avisarTelegram(reserva, env, f), reenviarN8n(reserva, env, f)])
  const canales = [telegram && 'telegram', n8n && 'n8n'].filter(Boolean) as string[]

  if (canales.length === 0) {
    return { status: 502, body: { ok: false, error: 'No pudimos avisar al café. Probá de nuevo en un momento o reservá por WhatsApp.' } }
  }
  return { status: 200, body: { ok: true, canales } }
}
