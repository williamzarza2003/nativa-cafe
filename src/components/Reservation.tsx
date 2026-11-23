import { useState, type ChangeEvent, type FormEvent } from 'react'
import { validateReservation, type ReservationData, type ReservationErrors } from '../lib/validateReservation.ts'

const initial: ReservationData = { name: '', email: '', date: '', time: '', people: 2 }

function todayISO(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function Reservation() {
  const [data, setData] = useState<ReservationData>(initial)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [sent, setSent] = useState<ReservationData | null>(null)

  function update(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: name === 'people' ? Number(value) : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const result = validateReservation(data)
    setErrors(result)
    if (Object.keys(result).length === 0) {
      setSent(data)
      setData(initial)
    }
  }

  const field = (key: keyof ReservationData) => ({
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  return (
    <section id="reservas" className="section">
      <div className="container reservation">
        <div>
          <p className="eyebrow">Reservas</p>
          <h2>Guardamos tu mesa.</h2>
          <p>
            Reservá con anticipación para grupos o para asegurarte un lugar en la terraza.
            Te confirmamos por email.
          </p>
        </div>

        {sent ? (
          <div className="confirm" role="status">
            <h3>¡Listo, {sent.name.split(' ')[0]}!</h3>
            <p>
              Recibimos tu reserva para <strong>{sent.people}</strong>{' '}
              {sent.people === 1 ? 'persona' : 'personas'} el <strong>{sent.date}</strong> a las{' '}
              <strong>{sent.time}</strong>. Te escribimos a {sent.email}.
            </p>
            <p className="note">Demo: el formulario no envía datos reales.</p>
            <button className="btn btn--ghost" onClick={() => setSent(null)}>Hacer otra reserva</button>
          </div>
        ) : (
          <form className="form" onSubmit={submit} noValidate>
            <label>
              Nombre y apellido
              <input name="name" value={data.name} onChange={update} autoComplete="name" {...field('name')} />
              {errors.name && <span id="name-error" className="error">{errors.name}</span>}
            </label>
            <label>
              Email
              <input name="email" type="email" value={data.email} onChange={update} autoComplete="email" {...field('email')} />
              {errors.email && <span id="email-error" className="error">{errors.email}</span>}
            </label>
            <div className="form__row">
              <label>
                Fecha
                <input name="date" type="date" min={todayISO()} value={data.date} onChange={update} {...field('date')} />
                {errors.date && <span id="date-error" className="error">{errors.date}</span>}
              </label>
              <label>
                Hora
                <input name="time" type="time" min="07:00" max="19:30" step={1800} value={data.time} onChange={update} {...field('time')} />
                {errors.time && <span id="time-error" className="error">{errors.time}</span>}
              </label>
              <label>
                Personas
                <select name="people" value={data.people} onChange={update} {...field('people')}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                {errors.people && <span id="people-error" className="error">{errors.people}</span>}
              </label>
            </div>
            <button type="submit" className="btn">Confirmar reserva</button>
          </form>
        )}
      </div>
    </section>
  )
}
