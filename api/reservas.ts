/**
 * POST /api/reservas · función serverless de Vercel (runtime Node.js, handlers estándar Request/Response).
 * Variables de entorno (Vercel › Settings › Environment Variables):
 *   TELEGRAM_BOT_TOKEN  token del bot (BotFather)
 *   TELEGRAM_CHAT_ID    chat o grupo que recibe los avisos
 *   N8N_WEBHOOK_URL     opcional: webhook de n8n para automatizaciones extra
 */
import { procesarReserva } from './_reservas.js'

export async function POST(request: Request): Promise<Response> {
  let cuerpo: unknown = null
  try {
    cuerpo = await request.json()
  } catch {
    // cuerpo inválido: procesarReserva responde 400
  }
  const { status, body } = await procesarReserva(cuerpo, {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  })
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}
