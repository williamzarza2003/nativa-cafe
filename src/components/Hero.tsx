export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        <p className="eyebrow">Café de especialidad · Pastelería artesanal</p>
        <h1>
          Tu pausa del día,
          <br />
          <em>bien hecha.</em>
        </h1>
        <p className="hero__lead">
          Granos de origen tostados cada semana, chipa recién horneada y un brunch sin apuro.
          Vení a trabajar, a charlar o simplemente a desconectar.
        </p>
        <div className="hero__actions">
          <a href="#reservas" className="btn">Reservar mesa</a>
          <a href="#menu" className="btn btn--ghost">Ver menú</a>
        </div>
        <ul className="hero__facts">
          <li><strong>07–20 h</strong> todos los días</li>
          <li><strong>Wi-Fi</strong> y enchufes en cada mesa</li>
          <li><strong>Pet friendly</strong> en la terraza</li>
        </ul>
      </div>
      <div className="hero__cup" aria-hidden="true">
        <div className="cup">
          <div className="cup__steam" />
          <div className="cup__body" />
          <div className="cup__handle" />
          <div className="cup__plate" />
        </div>
      </div>
    </section>
  )
}
