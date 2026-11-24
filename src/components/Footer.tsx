export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__marca">
          <img src="/favicon.svg" alt="" width={56} height={56} loading="lazy" />
          <p className="footer__nombre">Nativa</p>
          <p className="footer__lema">Café de especialidad, chipa y tereré en el centro de Ciudad del Este.</p>
        </div>

        <div className="footer__grid">
          <div>
            <h2 className="footer__titulo">Dónde</h2>
            <p>Av. Ficticia 1234, Centro</p>
            <p>Ciudad del Este, Alto Paraná</p>
          </div>
          <div>
            <h2 className="footer__titulo">Cuándo</h2>
            <p>Lunes a viernes, 7 a 20 h</p>
            <p>Sábados 8 a 20 h · Domingos 8 a 14 h</p>
          </div>
          <div>
            <h2 className="footer__titulo">Hablemos</h2>
            <p><a href="https://wa.me/595981000000">WhatsApp</a> · <a href="https://www.instagram.com/">Instagram</a></p>
            <p><a href="mailto:hola@nativacafe.example">hola@nativacafe.example</a></p>
          </div>
        </div>

        <div className="footer__pie">
          <p>© {new Date().getFullYear()} Nativa Café. Negocio ficticio, demo de portafolio.</p>
          <p>
            Diseño y desarrollo de{' '}
            <a href="https://github.com/williamzarza2003" target="_blank" rel="noreferrer">William Zarza</a>.
            Las reservas llegan por n8n a Telegram. Fotos de Unsplash.
          </p>
        </div>
      </div>
    </footer>
  )
}
