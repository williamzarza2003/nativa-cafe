export interface ReservationData {
  name: string
  email: string
  date: string
  time: string
  people: number
}

export type ReservationErrors = Partial<Record<keyof ReservationData, string>>

const OPEN_HOUR = 7
const CLOSE_HOUR = 20

export function validateReservation(data: ReservationData, today: Date = new Date()): ReservationErrors {
  const errors: ReservationErrors = {}

  if (data.name.trim().length < 3) errors.name = 'Ingresá tu nombre completo.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = 'Ingresá un email válido.'

  if (!data.date) {
    errors.date = 'Elegí una fecha.'
  } else {
    const chosen = new Date(data.date + 'T00:00:00')
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (chosen < start) errors.date = 'La fecha no puede ser anterior a hoy.'
  }

  if (!data.time) {
    errors.time = 'Elegí un horario.'
  } else {
    const hour = Number(data.time.split(':')[0])
    if (hour < OPEN_HOUR || hour >= CLOSE_HOUR) errors.time = 'Atendemos de 07:00 a 20:00.'
  }

  if (!Number.isInteger(data.people) || data.people < 1 || data.people > 10) {
    errors.people = 'Entre 1 y 10 personas (grupos más grandes, escribinos).'
  }

  return errors
}
