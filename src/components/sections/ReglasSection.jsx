import "./ReglasSection.css"
import SectionHeader from "../atoms/SectionHeader"

// Edita este arreglo con las reglas reales del torneo.
const REGLAS = [
  {
    icon: "groups",
    title: "Información del Torneo",
    desc: "Detalles generales, fechas de inscripcion y requisitos de participación.  \n |________________|", ///BOTON --> |________________|
  },
  {
    icon: "swords",
    title: "Formato de Torneo",
    desc: "Fase de grupos, enfrentamientos y clasificación a la siguiente etapa.",
  },
  {
    icon: "schedule",
    title: "Premios",
    desc: "Premios económicos para los equipos que lideren el primer y segundo lugar.",
  },
  {
    icon: "gavel",
    title: "Reglas",
    desc: "Normas de competencia, puntualidad, juego limpio y sanciones.  \n |____________________|", ///BOTON --> |________________|
  },
  {
    icon: "forum",
    title: "Patrocinadores",
    desc: "Marcas y negocios que apoyan el torneo y sus beneficios para los participantes.  \n |____________________|", ///BOTON --> |________________|
  },
  {
    icon: "verified",
    title: "Bonus adicionales por inscripción",
    desc: "Beneficios exclusivos para los equipos participantes.",
  },
]

export default function ReglasSection() {
  return (
    <section className="section section--light" id="reglas">
      <div className="container">
        <SectionHeader
          dataAos="fade-up"
          title="Información General"
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
