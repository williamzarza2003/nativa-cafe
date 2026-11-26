// Ñandutí dibujado con SVG: anillos de hilos alrededor de un centro.
// Cada trazo usa pathLength=1 para que el CSS lo "teja" al cargar.

const C = 200
const TAU = Math.PI * 2

function pt(r: number, a: number): string {
  return `${(C + r * Math.cos(a)).toFixed(2)} ${(C + r * Math.sin(a)).toFixed(2)}`
}

function petals(n: number, r1: number, r2: number, w: number, offset = 0): string {
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + offset
    const rm = (r1 + r2) / 2
    d += `M${pt(r1, a)} Q${pt(rm, a - w)} ${pt(r2, a)} Q${pt(rm, a + w)} ${pt(r1, a)} `
  }
  return d
}

function spokes(n: number, r1: number, r2: number): string {
  let d = ''
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU
    d += `M${pt(r1, a)} L${pt(r2, a)} `
  }
  return d
}

function zigzag(n: number, r1: number, r2: number, offset = 0): string {
  let d = ''
  for (let i = 0; i <= n * 2; i++) {
    const a = (i / (n * 2)) * TAU + offset
    d += `${i === 0 ? 'M' : 'L'}${pt(i % 2 === 0 ? r1 : r2, a)} `
  }
  return d
}

function scallops(n: number, r: number, bulge: number): string {
  let d = `M${pt(r, 0)} `
  for (let i = 0; i < n; i++) {
    const a1 = ((i + 1) / n) * TAU
    const mid = ((i + 0.5) / n) * TAU
    d += `Q${pt(r + bulge, mid)} ${pt(r, a1)} `
  }
  return d
}

const rings = [
  { d: spokes(48, 22, 188), cls: 'n-thread n-thread--fine', delay: 0 },
  { d: petals(8, 10, 46, 0.32), cls: 'n-thread n-thread--sun', delay: 0.2 },
  { d: zigzag(16, 52, 72), cls: 'n-thread n-thread--lime', delay: 0.45 },
  { d: petals(16, 78, 122, 0.12, Math.PI / 16), cls: 'n-thread', delay: 0.7 },
  { d: zigzag(24, 128, 142, Math.PI / 24), cls: 'n-thread n-thread--sun', delay: 0.95 },
  { d: petals(24, 146, 176, 0.07), cls: 'n-thread n-thread--berry', delay: 1.2 },
  { d: scallops(36, 180, 14), cls: 'n-thread', delay: 1.45 },
]

const circles = [
  { r: 50, cls: 'n-thread n-thread--fine', delay: 0.3 },
  { r: 76, cls: 'n-thread n-thread--fine', delay: 0.6 },
  { r: 125, cls: 'n-thread n-thread--fine', delay: 0.85 },
  { r: 144, cls: 'n-thread n-thread--fine', delay: 1.1 },
]

export default function Nanduti({ className = '' }: { className?: string }) {
  return (
    <svg className={`nanduti ${className}`} viewBox="0 0 400 400" aria-hidden="true" focusable="false">
      {circles.map((c) => (
        <circle key={c.r} cx={C} cy={C} r={c.r} pathLength={1} className={c.cls} style={{ animationDelay: `${c.delay}s` }} />
      ))}
      {rings.map((ring, i) => (
        <path key={i} d={ring.d} pathLength={1} className={ring.cls} style={{ animationDelay: `${ring.delay}s` }} />
      ))}
      <circle cx={C} cy={C} r={6} className="n-knot" />
    </svg>
  )
}
