import { useState } from 'react'
import { categories, formatGs, menu, type Category } from '../data/menu.ts'

export default function Menu() {
  const [active, setActive] = useState<Category>('cafe')
  const items = menu.filter((item) => item.category === active)

  return (
    <section id="menu" className="section">
      <div className="container">
        <p className="eyebrow">Nuestra carta</p>
        <h2>Menú</h2>
        <div className="tabs" role="tablist" aria-label="Categorías del menú">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              className={active === c.id ? 'tab tab--active' : 'tab'}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <ul className="menu-grid" role="tabpanel">
          {items.map((item) => (
            <li key={item.id} className="menu-card">
              <div className="menu-card__top">
                <h3>{item.name}</h3>
                <span className="price">{formatGs(item.price)}</span>
              </div>
              <p>{item.description}</p>
              {item.tag && <span className="badge">{item.tag}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
