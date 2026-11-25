import { useState } from 'react'
import Foto from './Foto.tsx'

// Es una secuencia real, por eso va numerada
const pasos = [
  {
    titulo: 'Origen',
    texto: 'Compramos lotes chicos a productores de Amambay y del sur de Minas Gerais que conocemos por nombre. Probamos cada muestra antes de traerla.',
    dato: 'Lotes de 60 kg',
    foto: 'origen',
    alt: 'Ramas de cafeto con frutos verdes y rojos',
  },
  {
    titulo: 'Tostado los martes',
    texto: 'Una vez por semana, en lotes de cinco kilos. Lo que se tuesta el martes se sirve hasta el domingo y no más.',
    dato: '5 kg por tanda',
    foto: 'tostado',
    alt: 'Granos recién tostados girando en el enfriador de la tostadora',
  },
  {
    titulo: 'En tu taza',
    texto: 'Molemos al momento y medimos cada receta. Si un café no salió como tiene que salir, lo hacemos de nuevo.',
    dato: 'Molido al momento',
    foto: 'preparacion',
    alt: 'Café con leche recién servido sobre una mesa de madera',
  },
]

/**
 * Una sola foto grande que cambia según el paso que se mira (mouse, foco o toque),
 * para no repetir otra grilla de tres fotos justo después de los destacados de la carta.
 * Los textos de los tres pasos están siempre visibles: solo cambia la imagen.
 */
export default function Proceso() {
  const [activo, setActivo] = useState(0)

  return (
    <section className="section proceso" aria-labelledby="titulo-proceso">
      <div className="container proceso__grilla">
        <div className="proceso__fotos" aria-live="polite">
          {pasos.map((p, i) => (
            <Foto
              key={p.foto}
              nombre={p.foto}
              alt={i === activo ? p.alt : ''}
              ancho={1200}
              alto={1500}
              sizes="(max-width: 720px) 92vw, 42vw"
              className={i === activo ? 'proceso__foto proceso__foto--activa' : 'proceso__foto'}
            />
          ))}
          <p className="proceso__dato" aria-hidden="true">{pasos[activo].dato}</p>
        </div>

        <div className="proceso__texto">
          <h2 id="titulo-proceso">Del grano a la taza</h2>
          <p className="proceso__bajada">Tres pasos, una semana. Elegí uno para verlo.</p>
          <ol className="pasos">
            {pasos.map((p, i) => (
              <li key={p.titulo} className={i === activo ? 'paso paso--activo' : 'paso'}>
                <button
                  type="button"
                  className="paso__boton"
                  aria-pressed={i === activo}
                  onClick={() => setActivo(i)}
                  onMouseEnter={() => setActivo(i)}
                  onFocus={() => setActivo(i)}
                >
                  <span className="paso__numero" aria-hidden="true">{i + 1}</span>
                  <span className="paso__cuerpo">
                    <span className="paso__titulo">{p.titulo}</span>
                    <span className="paso__detalle">{p.texto}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
