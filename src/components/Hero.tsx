import Nanduti from './Nanduti.tsx'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <h1>Café de especialidad, tostado acá en Ciudad del Este.</h1>
          <p className="hero__lead">
            Granos de pequeños productores, chipa que sale del horno a las siete
            y cocido quemado con mbeju para la merienda.
          </p>
          <div className="hero__actions">
            <a href="#reservas" className="btn btn--sun">Reservar mesa</a>
            <a href="#menu" className="link-light">Ver la carta</a>
          </div>
        </div>
        <Nanduti className="hero__nanduti" />
      </div>
      <div className="hero__info">
        <ul className="container">
          <li><strong>Todos los días</strong> de 7 a 20 h</li>
          <li><strong>Av. Ficticia 1234</strong>, Centro</li>
          <li><strong>Wi-Fi y enchufes</strong> en cada mesa</li>
        </ul>
      </div>
    </section>
  )
}
