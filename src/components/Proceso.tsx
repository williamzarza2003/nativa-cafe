import Foto from './Foto.tsx'

// Es una secuencia real, por eso va numerada
const pasos = [
  {
    titulo: 'Origen',
    texto: 'Compramos lotes chicos a productores de Brasil y Colombia que conocemos por nombre. Probamos cada muestra antes de traerla.',
    foto: 'origen',
    alt: 'Ramas de cafeto con frutos verdes y rojos',
  },
  {
    titulo: 'Tostado los martes',
    texto: 'Una vez por semana, en lotes de cinco kilos. Lo que se tuesta el martes se sirve hasta el domingo y no más.',
    foto: 'tostado',
    alt: 'Granos recién tostados girando en el enfriador de la tostadora',
  },
  {
    titulo: 'En tu taza',
    texto: 'Molemos al momento y medimos cada receta. Si un café no salió como tiene que salir, lo hacemos de nuevo.',
    foto: 'preparacion',
    alt: 'Café con leche recién servido sobre una mesa de madera',
  },
]

export default function Proceso() {
  return (
    <section className="section proceso" aria-labelledby="titulo-proceso">
      <div className="container">
        <h2 id="titulo-proceso">Del grano a la taza</h2>
        <ol className="pasos">
          {pasos.map((p, i) => (
            <li key={p.titulo} className="paso">
              <Foto nombre={p.foto} alt={p.alt} ancho={640} alto={800} sizes="(max-width: 720px) 90vw, 30vw" />
              <div className="paso__texto">
                <span className="paso__numero" aria-hidden="true">{i + 1}</span>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
