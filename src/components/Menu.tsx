import { useState, type CSSProperties } from 'react'
import { categories, formatGs, menu, type Category } from '../data/menu.ts'
import Foto from './Foto.tsx'

// La merienda paraguaya: los tres que más salen. El resto de la carta sigue en formato pizarra.
const destacados: { id: number; foto: string; alt: string; nota?: string }[] = [
  { id: 8, foto: 'chipa', alt: 'Dos chipas en rosca y una chipa alargada en un plato de cerámica, junto a una taza' },
  { id: 30, foto: 'mbeju', alt: 'Mbeju tostado en un plato de cerámica, con una taza de cocido adelante' },
  { id: 20, foto: 'cocido', alt: 'Una brasa apoyada sobre yerba y azúcar en un plato hondo: así se quema el cocido', nota: 'Así se quema: brasa sobre yerba y azúcar' },
]

export default function Menu() {
  const [active, setActive] = useState<Category>('cafe')
  const items = menu.filter((item) => item.category === active)

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <header className="menu__intro">
          <h2>La carta</h2>
          <p>Precios en guaraníes. De mañana, café de especialidad; a la tarde, la merienda de siempre. El café de filtro cambia cada semana según el lote que tostamos.</p>
        </header>

        <ul className="destacados" aria-label="Los más pedidos">
          {destacados.map((d) => {
            const item = menu.find((m) => m.id === d.id)!
            return (
              <li key={d.id} className="destacado">
                <div className="destacado__foto">
                  <Foto nombre={d.foto} alt={d.alt} ancho={640} alto={800} sizes="(max-width: 720px) 45vw, 30vw" />
                  {d.nota && <p className="destacado__nota">{d.nota}</p>}
                </div>
                <div className="destacado__texto">
                  <h3>{item.name}</h3>
                  <span className="destacado__precio">{formatGs(item.price)}</span>
                  <p>{item.description}{item.tag && <> {item.tag}</>}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="pizarra">
          <div className="tabs" role="tablist" aria-label="Categorías de la carta">
            {categories.map((c) => (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={active === c.id}
                aria-controls="menu-panel"
                className={active === c.id ? 'tab tab--active' : 'tab'}
                onClick={() => setActive(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
          {/* key={active} vuelve a montar la lista para que la animación de entrada corra en cada cambio */}
          <div role="tabpanel" id="menu-panel" aria-labelledby={`tab-${active}`}>
            <ul key={active} className="menu-list">
              {items.map((item, i) => (
                <li key={item.id} className="menu-item" style={{ '--i': i } as CSSProperties}>
                  <div className="menu-item__line">
                    <h3>{item.name}</h3>
                    <span className="menu-item__dots" aria-hidden="true" />
                    <span className="menu-item__price">{formatGs(item.price)}</span>
                  </div>
                  <p>
                    {item.description}
                    {item.tag && <span className="menu-item__tag"> {item.tag}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
