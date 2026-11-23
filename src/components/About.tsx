const features = [
  { title: 'Origen trazable', text: 'Trabajamos con pequeños productores y tostamos en lotes chicos cada semana.' },
  { title: 'Todo casero', text: 'La pastelería y el pan de masa madre salen de nuestro horno cada mañana.' },
  { title: 'Espacio para quedarse', text: 'Mesas amplias, buena luz y Wi-Fi rápido para trabajar o estudiar.' },
]

export default function About() {
  return (
    <section id="nosotros" className="section section--alt">
      <div className="container about">
        <div>
          <p className="eyebrow">Nosotros</p>
          <h2>Hecho con calma, servido con cariño.</h2>
          <p className="about__lead">
            Nativa nació de una idea simple: que un buen café no tiene que ser complicado.
            Cuidamos cada paso, del grano a la taza.
          </p>
        </div>
        <ul className="features">
          {features.map((f, i) => (
            <li key={f.title} className="feature">
              <span className="feature__num">0{i + 1}</span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
