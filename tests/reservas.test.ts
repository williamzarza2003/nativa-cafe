import { afterEach, describe, expect, it, vi } from 'vitest'
import { hoyEnAsuncion, mensajeTelegram, procesarReserva } from '../api/_reservas.js'
import { POST } from '../api/reservas.js'

const AHORA = new Date('2026-11-24T15:00:00Z') // martes 24, 12:00 en Asunción
const valida = { name: 'Lucía Benítez', email: 'lucia@example.com', date: '2026-11-28', time: '19:30', people: 4 }
const env = { TELEGRAM_BOT_TOKEN: 'token-de-prueba', TELEGRAM_CHAT_ID: '123', N8N_WEBHOOK_URL: 'https://n8n.example/webhook/reservas' }

/** fetch simulado: responde según la URL y registra las llamadas */
function fetchFalso(resp: { telegram?: number | 'cuelga'; n8n?: number | 'cuelga' }) {
  const llamadas: string[] = []
  const f = vi.fn(async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url)
    llamadas.push(u)
    const r = u.includes('api.telegram.org') ? resp.telegram : resp.n8n
    if (r === 'cuelga') {
      return new Promise<Response>((_, rechazar) => init?.signal?.addEventListener('abort', () => rechazar(new Error('timeout'))))
    }
    return new Response('{}', { status: r ?? 200 })
  })
  return { f: f as unknown as typeof fetch, llamadas }
}

afterEach(() => vi.unstubAllGlobals())

describe('hoyEnAsuncion', () => {
  it('a las 23:30 de Paraguay sigue siendo el mismo día aunque en UTC ya sea mañana', () => {
    const hoy = hoyEnAsuncion(new Date('2026-11-25T02:30:00Z'))
    expect([hoy.getFullYear(), hoy.getMonth() + 1, hoy.getDate()]).toEqual([2026, 11, 24])
  })
})

describe('procesarReserva', () => {
  it('avisa por Telegram y reenvía a n8n', async () => {
    const { f, llamadas } = fetchFalso({})
    const r = await procesarReserva(valida, env, f, AHORA)
    expect(r).toEqual({ status: 200, body: { ok: true, canales: ['telegram', 'n8n'] } })
    expect(llamadas.some((u) => u.includes('/bottoken-de-prueba/sendMessage'))).toBe(true)
  })

  it('si n8n no responde, la reserva queda confirmada igual por Telegram', async () => {
    const { f } = fetchFalso({ n8n: 'cuelga' })
    const r = await procesarReserva(valida, env, f, AHORA)
    expect(r.status).toBe(200)
    expect(r.body).toEqual({ ok: true, canales: ['telegram'] })
  }, 10_000)

  it('si no llega por ningún canal responde 502 para ofrecer WhatsApp', async () => {
    const { f } = fetchFalso({ telegram: 500, n8n: 500 })
    const r = await procesarReserva(valida, env, f, AHORA)
    expect(r.status).toBe(502)
  })

  it('valida en el servidor con las mismas reglas que el frontend', async () => {
    const { f, llamadas } = fetchFalso({})
    const r = await procesarReserva({ ...valida, time: '21:00', people: 15, date: '2026-11-20' }, env, f, AHORA)
    expect(r.status).toBe(422)
    if (r.body.ok) throw new Error('debería fallar')
    expect(Object.keys(r.body.campos ?? {}).sort()).toEqual(['date', 'people', 'time'])
    expect(llamadas).toHaveLength(0)
  })

  it('no confía en los tipos que manda el navegador', async () => {
    const { f } = fetchFalso({})
    const r = await procesarReserva({ ...valida, people: '4' }, env, f, AHORA)
    expect(r.status).toBe(422)
  })

  it('sin variables configuradas responde 503', async () => {
    const r = await procesarReserva(valida, {}, fetchFalso({}).f, AHORA)
    expect(r.status).toBe(503)
  })

  it('el campo trampa corta a los bots sin avisar a nadie', async () => {
    const { f, llamadas } = fetchFalso({})
    const r = await procesarReserva({ ...valida, empresa: 'spam' }, env, f, AHORA)
    expect(r.status).toBe(200)
    expect(llamadas).toHaveLength(0)
  })

  it('arma un aviso legible para Telegram', () => {
    const m = mensajeTelegram(valida)
    expect(m).toContain('Lucía Benítez')
    expect(m).toContain('sábado, 28 de noviembre a las 19:30')
    expect(m).toContain('4 personas')
  })
})

describe('POST /api/reservas', () => {
  it('responde JSON y rechaza un cuerpo que no es JSON', async () => {
    const res = await POST(new Request('http://localhost/api/reservas', { method: 'POST', body: 'no es json' }))
    expect(res.status).toBe(400)
    expect(res.headers.get('content-type')).toContain('application/json')
  })
})
