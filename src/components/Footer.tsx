export default function Footer() {
  return (
    <footer id="visitanos" className="footer">
      <div className="container footer__grid">
        <div>
          <h2 className="footer__title">Visitanos</h2>
          <p>Av. Ficticia 1234, Centro, Ciudad del Este</p>
          <p>Lunes a domingo, de 7:00 a 20:00</p>
        </div>
        <div>
          <h3>Contacto</h3>
          <p>hola@nativacafe.example</p>
          <p>@nativacafe</p>
        </div>
        <div>
          <h3>Sobre este sitio</h3>
          <p>
            Proyecto de portafolio con un negocio ficticio. Diseño y desarrollo de{' '}
            <a href="https://github.com/williamzarza2003" target="_blank" rel="noreferrer">William Zarza</a>{' '}
            con React, TypeScript y Vite. Las reservas llegan a un flujo de n8n.
          </p>
        </div>
      </div>
      <p className="container footer__copy">© {new Date().getFullYear()} Nativa Café. Demo sin fines comerciales.</p>
    </footer>
  )
}
