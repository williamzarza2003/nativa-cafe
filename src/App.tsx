import Header from './components/Header.tsx'
import Hero from './components/Hero.tsx'
import Menu from './components/Menu.tsx'
import About from './components/About.tsx'
import Reservation from './components/Reservation.tsx'
import Footer from './components/Footer.tsx'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Menu />
        <About />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
