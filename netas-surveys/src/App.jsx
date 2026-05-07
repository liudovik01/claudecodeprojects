import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import About from './components/About'
import Process from './components/Process'
import WhyNetas from './components/WhyNetas'
import Clientele from './components/Clientele'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#0a1628' }}>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <About />
        <Process />
        <WhyNetas />
        <Clientele />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
