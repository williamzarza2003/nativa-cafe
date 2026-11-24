import { useState } from 'react'

const links = [
  { href: '#menu', label: 'Carta' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#reservas', label: 'Reservas' },
  { href: '#visitanos', label: 'Visitanos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#inicio" className="logo" aria-label="Nativa Café, inicio">
          <img src="/favicon.svg" alt="" width={30} height={30} />
          <span>Nativa</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Abrir menú</span>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
        <nav id="main-nav" className={open ? 'nav nav--open' : 'nav'} aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#reservas" className="btn btn--small btn--earth" onClick={() => setOpen(false)}>
            Reservar
          </a>
        </nav>
      </div>
    </header>
  )
}
