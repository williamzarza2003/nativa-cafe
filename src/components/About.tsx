const facts = [
  { title: 'Tostamos los martes', text: 'Lotes chicos de pequeños productores. Lo que se tuesta el martes se sirve esa semana.' },
  { title: 'Horno desde las seis', text: 'Chipa con queso Paraguay, medialunas y pan de masa madre, todo hecho acá.' },
  { title: 'Mesas para quedarse', text: 'Buena luz, enchufes y Wi-Fi rápido. Nadie te apura si pediste un solo café.' },
]

export default function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container about__layout">
        <div>
          <h2>Un café de barrio que se toma el café en serio.</h2>
          <p className="about__lead">
            Abrimos Nativa para tener en el centro de Ciudad del Este el café que
            buscábamos en otras ciudades: bien tostado, bien preparado y sin pretensiones.
          </p>
        </div>
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.title} className="fact">
              <dt>{f.title}</dt>
              <dd>{f.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
