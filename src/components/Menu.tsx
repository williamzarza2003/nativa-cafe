import { useState, type CSSProperties } from 'react'
import { categories, formatGs, menu, type Category } from '../data/menu.ts'

export default function Menu() {
  const [active, setActive] = useState<Category>('cafe')
  const items = menu.filter((item) => item.category === active)

  return (
    <section id="menu" className="section menu">
      <div className="container menu__layout">
        <div className="menu__head">
          <h2>La carta</h2>
          <p>Precios en guaraníes. El café de filtro cambia cada semana según el lote que tostamos.</p>
        </div>
        <div>
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
          <ul key={active} className="menu-list" role="tabpanel" id="menu-panel" aria-labelledby={`tab-${active}`}>
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
    </section>
  )
}
