import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { validateReservation, type ReservationData, type ReservationErrors } from '../lib/validateReservation.ts'
import Nanduti from './Nanduti.tsx'

// Función serverless de Vercel (api/reservas.ts): avisa por Telegram y reenvía a n8n si está prendido
const API_RESERVAS = '/api/reservas'
const WHATSAPP = '595981000000' // número ficticio de la demo
const MIN_PERSONAS = 1
const MAX_PERSONAS = 10

const initial: ReservationData = { name: '', email: '', date: '', time: '', people: 2 }

// Turnos cada 30 minutos de 07:00 a 19:30, agrupados por momento del día
const turnos = Array.from({ length: 26 }, (_, i) => {
  const min = 7 * 60 + i * 30
  return `${String(Math.floor(min / 60)).padStart(2, '0')}:${min % 60 === 0 ? '00' : '30'}`
})
const franjas = [
  { nombre: 'Mañana', horas: turnos.filter((t) => t < '12:00') },
  { nombre: 'Mediodía', horas: turnos.filter((t) => t >= '12:00' && t < '15:00') },
  { nombre: 'Tarde', horas: turnos.filter((t) => t >= '15:00') },
]

function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function fechaLarga(iso: string): string {
  return new Date(iso + 'T12:00:00').toLocaleDateString('es-PY', { weekday: 'long', day: 'numeric', month: 'long' })
}

export default function Reservation() {
  const [data, setData] = useState<ReservationData>(initial)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [sent, setSent] = useState<ReservationData | null>(null)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [empresa, setEmpresa] = useState('') // campo trampa para bots, invisible para personas
  const confirmRef = useRef<HTMLDivElement>(null)

  // Al confirmar, la tarjeta reemplaza al formulario: llevamos la vista y el foco ahí
  useEffect(() => {
    if (!sent) return
    confirmRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    confirmRef.current?.focus({ preventScroll: true })
  }, [sent])

  function set<K extends keyof ReservationData>(key: K, value: ReservationData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function update(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    set(name as 'name' | 'email' | 'date', value)
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = validateReservation(data)
    setErrors(result)
    if (Object.keys(result).length > 0) {
      // Llevamos el foco al primer campo con error para que se entienda qué falta
      const primero = (['name', 'email', 'date', 'time', 'people'] as const).find((k) => result[k])
      document.getElementById(`campo-${primero}`)?.focus()
      return
    }

    setSending(true)
    setSendError(false)
    try {
      const res = await fetch(API_RESERVAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, empresa }),
        signal: AbortSignal.timeout(15_000),
      })
      if (res.status === 422) {
        // El servidor valida con las mismas reglas: si algo no pasa, se marca el campo
        const { campos } = (await res.json()) as { campos?: ReservationErrors }
        if (campos && Object.keys(campos).length) {
          setErrors(campos)
          const primero = (['name', 'email', 'date', 'time', 'people'] as const).find((k) => campos[k])
          document.getElementById(`campo-${primero}`)?.focus()
          return
        }
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSent(data)
      setData(initial)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const field = (key: keyof ReservationData) => ({
    id: `campo-${key}`,
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  const mensajeWhatsApp = encodeURIComponent(
    `Hola, quiero reservar una mesa para ${data.people} ${data.people === 1 ? 'persona' : 'personas'}` +
      (data.date ? ` el ${fechaLarga(data.date)}` : '') +
      (data.time ? ` a las ${data.time}` : '') +
      (data.name ? `. Soy ${data.name}.` : '.'),
  )

  return (
    <section id="reservas" className="section reserve">
      <div className="container reservation">
        <div className="reservation__intro">
          <h2>Reservá tu mesa</h2>
          <p>
            Para grupos o para asegurarte un lugar en la galería los fines de semana.
            Te confirmamos por email el mismo día.
          </p>
          <p className="reservation__small">Grupos de más de 10 personas: escribinos a hola@nativacafe.example.</p>
        </div>

        {sent ? (
          <div className="confirm" role="status" ref={confirmRef} tabIndex={-1}>
            <Nanduti className="confirm__nanduti" />
            <h3>Mesa reservada, {sent.name.split(' ')[0]}.</h3>
            <p>
              Te esperamos el <strong>{fechaLarga(sent.date)}</strong> a las <strong>{sent.time}</strong>,{' '}
              {sent.people === 1 ? 'para vos solo' : <>para <strong>{sent.people} personas</strong></>}.
              Te escribimos a {sent.email} para confirmar.
            </p>
            <button className="btn btn--outline" onClick={() => setSent(null)}>Hacer otra reserva</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <label className="trampa" aria-hidden="true">
              Empresa
              <input name="empresa" tabIndex={-1} autoComplete="off" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
            </label>
            <label>
              Nombre y apellido
              <input name="name" value={data.name} onChange={update} autoComplete="name" {...field('name')} />
              {errors.name && <span id="name-error" className="error">{errors.name}</span>}
            </label>
            <label>
              Email
              <input name="email" type="email" value={data.email} onChange={update} autoComplete="email" inputMode="email" {...field('email')} />
              {errors.email && <span id="email-error" className="error">{errors.email}</span>}
            </label>

            <div className="form__row">
              <label>
                Fecha
                <input name="date" type="date" min={todayISO()} value={data.date} onChange={update} {...field('date')} />
                {errors.date && <span id="date-error" className="error">{errors.date}</span>}
              </label>

              <div className="contador-campo">
                <span className="campo-titulo" id="personas-titulo">Personas</span>
                <div className="contador" role="group" aria-labelledby="personas-titulo">
                  <button
                    type="button" className="contador__boton" aria-label="Una persona menos"
                    onClick={() => set('people', Math.max(MIN_PERSONAS, data.people - 1))}
                    disabled={data.people <= MIN_PERSONAS}
                  >−</button>
                  <output id="campo-people" className="contador__valor" aria-live="polite" tabIndex={-1}>
                    {data.people}
                  </output>
                  <button
                    type="button" className="contador__boton" aria-label="Una persona más"
                    onClick={() => set('people', Math.min(MAX_PERSONAS, data.people + 1))}
                    disabled={data.people >= MAX_PERSONAS}
                  >+</button>
                </div>
                {errors.people && <span id="people-error" className="error">{errors.people}</span>}
              </div>
            </div>

            <fieldset className="turnos" aria-describedby={errors.time ? 'time-error' : undefined}>
              <legend className="campo-titulo">Horario</legend>
              {franjas.map((f) => (
                <div key={f.nombre} className="turnos__franja">
                  <span className="turnos__nombre">{f.nombre}</span>
                  <div className="turnos__grilla">
                    {f.horas.map((h, i) => (
                      <label key={h} className={data.time === h ? 'turno turno--activo' : 'turno'}>
                        <input
                          type="radio" name="time" value={h} checked={data.time === h}
                          onChange={() => set('time', h)}
                          id={f.nombre === 'Mañana' && i === 0 ? 'campo-time' : undefined}
                        />
                        {h}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              {errors.time && <span id="time-error" className="error">{errors.time}</span>}
            </fieldset>

            {sendError && (
              <div className="aviso-error" role="alert">
                <p>
                  <strong>No pudimos enviar la reserva.</strong> Puede ser la conexión o que el sistema esté
                  caído un momento. Probá de nuevo o reservá por WhatsApp: el mensaje ya va con tus datos.
                </p>
                <a className="btn btn--whatsapp" href={`https://wa.me/${WHATSAPP}?text=${mensajeWhatsApp}`} target="_blank" rel="noreferrer">
                  Reservar por WhatsApp
                </a>
              </div>
            )}
            <button type="submit" className="btn btn--sun" disabled={sending}>
              {sending ? 'Enviando reserva…' : 'Reservar mesa'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
