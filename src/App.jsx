import { ToastContainer } from "react-toastify"
import Navbar from "./components/Navbar"
import HeroSection from "./components/sections/HeroSection"
import ReglasSection from "./components/sections/ReglasSection"
import InscripcionSection from "./components/sections/InscripcionSection"
import EquiposSection from "./components/sections/EquiposSection"
import FooterSection from "./components/sections/FooterSection"

const heroData = {
  title: "MACHACHI",
  title1: "CUP",
  subtitle:
    "Demuestra tu habilidad, estrategia y poder en nuestro torneo de Dota 2.",
  primaryCta: { label: "Inscríbete", href: "#inscripcion" },
  secondaryCta: { label: "Equipos Inscritos", href: "#equipos" },
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection {...heroData} />
        <ReglasSection />
        <InscripcionSection />
        <EquiposSection />
      </main>
      <FooterSection />
      <ToastContainer theme="dark" position="bottom-right" />
    </>
  )
}
