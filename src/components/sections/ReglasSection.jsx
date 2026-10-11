import "./ReglasSection.css"
import SectionHeader from "../atoms/SectionHeader"

// Edita este arreglo con las reglas reales del torneo.
const REGLAS = [
  {
    icon: "groups",
    title: "Equipos de 5 jugadores",
    desc: "Cada equipo se inscribe con 5 jugadores titulares y, opcionalmente, 1 suplente. Debe haber un capitán responsable del equipo.",
  },
  {
    icon: "swords",
    title: "Formato de partidas",
    desc: "Las partidas se juegan en modo Captain's Mode, en el servidor y con la versión del juego definidos por la organización.",
  },
  {
    icon: "schedule",
    title: "Puntualidad",
    desc: "Los equipos deben estar listos en el lobby a la hora indicada. Pasados 10 minutos de retraso se puede declarar derrota por W.O.",
  },
  {
    icon: "gavel",
    title: "Juego limpio",
    desc: "Están prohibidos los scripts, exploits, cuentas compartidas y cualquier forma de trampa. Quien incumpla será descalificado.",
  },
  {
    icon: "forum",
    title: "Respeto",
    desc: "No se toleran insultos, discriminación ni toxicidad hacia rivales, compañeros u organizadores, dentro ni fuera de la partida.",
  },
  {
    icon: "verified",
    title: "Decisión final",
    desc: "Cualquier disputa se resuelve con los organizadores del torneo y su decisión es definitiva.",
  },
]

export default function ReglasSection() {
  return (
    <section className="section section--light" id="reglas">
      <div className="container">
        <SectionHeader
          dataAos="fade-up"
          title="Reglas del torneo"
          subtitle="Lee con atención antes de inscribir a tu equipo."
        />
        <div className="reglas-grid">
          {REGLAS.map((regla, index) => (
            <article
              className="regla-card"
              key={regla.title}
              data-aos="fade-up"
              data-aos-delay={Math.min(index * 80, 240)}
            >
              <div className="regla-card__icon-wrap">
                <span className="material-symbols-outlined">{regla.icon}</span>
              </div>
              <h3 className="regla-card__title">{regla.title}</h3>
              <p className="regla-card__desc">{regla.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
