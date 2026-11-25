const horarios = [
  { dias: 'Todos los días', horas: '07:00 a 20:00' },
  { dias: 'Chipa caliente', horas: 'cada media hora' },
  { dias: 'Merienda: cocido y mbeju', horas: '15:00 a 19:00' },
  { dias: 'Café recién tostado', horas: 'desde el martes' },
]

// Centro de Ciudad del Este (ubicación aproximada para la demo)
const MAPA =
  'https://www.openstreetmap.org/export/embed.html?bbox=-54.6185%2C-25.5135%2C-54.6035%2C-25.5055&layer=mapnik&marker=-25.5095%2C-54.6110'

export default function Visitanos() {
  return (
    <section id="visitanos" className="section visitanos" aria-labelledby="titulo-visitanos">
      <div className="container visitanos__layout">
        <div>
          <h2 id="titulo-visitanos">Visitanos</h2>
          <address className="visitanos__direccion">
            Av. Ficticia 1234, casi Pampliega
            <br />
            Centro, Ciudad del Este
          </address>
          <p className="visitanos__ayuda">En pleno microcentro, a media cuadra de la avenida San Blas. Hay estacionamiento en la cuadra y bicicletero en la vereda.</p>

          <table className="horarios">
            <caption className="sr-only">Horarios de atención y del horno</caption>
            <tbody>
              {horarios.map((h) => (
                <tr key={h.dias}>
                  <th scope="row">{h.dias}</th>
                  <td>{h.horas}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="visitanos__acciones">
            <a className="btn btn--whatsapp" href="https://wa.me/595981000000" target="_blank" rel="noreferrer">
              Escribinos por WhatsApp
            </a>
            <a className="btn btn--outline" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <p className="note">WhatsApp +595 981 000 000 (número de demo)</p>
        </div>

        <figure className="mapa">
          <iframe
            title="Mapa del centro de Ciudad del Este con la ubicación de Nativa Café"
            src={MAPA}
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <figcaption>
            <a href="https://www.openstreetmap.org/?mlat=-25.5095&mlon=-54.6110#map=17/-25.5095/-54.6110" target="_blank" rel="noreferrer">
              Abrir el mapa más grande
            </a>{' '}
            · © colaboradores de OpenStreetMap
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
