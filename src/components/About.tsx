import Foto from './Foto.tsx'

const facts = [
  { title: 'Horno desde las seis', text: 'Chipa en rosca, sopa paraguaya y chipa guasu, con queso Paraguay de una quesería de Hernandarias.' },
  { title: 'Mesas para quedarse', text: 'Buena luz, enchufes y Wi-Fi rápido. Nadie te apura si pediste un solo café.' },
  { title: '¿Trajiste tu termo?', text: 'El tereré es tuyo y de tu ronda: nosotros te cargamos el termo con hielo, sin cobrarte nada.' },
]

export default function About() {
  return (
    <section id="nosotros" className="section about">
      <div className="container about__layout">
        <div className="about__texto">
          <h2>Un café de barrio que se toma el café en serio.</h2>
          <p className="about__lead">
            Abrimos Nativa para tener en el centro de Ciudad del Este el café que
            buscábamos en otras ciudades: bien tostado, bien preparado y sin pretensiones.
          </p>
          <dl className="facts">
            {facts.map((f) => (
              <div key={f.title} className="fact">
                <dt>{f.title}</dt>
                <dd>{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="about__foto">
          <Foto nombre="interior" alt="Barista preparando café detrás del mostrador, con sol de la mañana entrando por los ventanales" ancho={1200} alto={800} sizes="(max-width: 900px) 100vw, 50vw" />
          <figcaption>La barra a las ocho de la mañana, cuando entra el sol por los ventanales.</figcaption>
        </figure>
      </div>
    </section>
  )
}
