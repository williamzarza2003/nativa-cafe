import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Menu from './components/Menu.tsx'
import Proceso from './components/Proceso.tsx'
import About from './components/About.tsx'
import Reservation from './components/Reservation.tsx'
import Visitanos from './components/Visitanos.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <>
      <a href="#menu" className="saltar">Ir al contenido</a>
      <Header />
      <main>
        <Hero />
        <Menu />
        <Proceso />
        <About />
        <Reservation />
        <Visitanos />
      </main>
      <Footer />
    </>
  )
}
