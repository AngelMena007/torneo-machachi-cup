import "./ReglasSection.css"
import SectionHeader from "../atoms/SectionHeader"
import { useEffect, useState } from "react"

const REGLAS = [
  {
    icon: "groups",
    title: "Información del Torneo",
    desc: "Detalles generales, fechas de inscripcion y requisitos de participación.",
    action: { type: "pdf", href: "src\\assets\\documents\\MACHACHI_CUP_INFO.pdf" },
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
    action: { type: "image", src: "src\\assets\\img\\PREMIOS_MACHACHI_CUP_OP2.jpeg" },
  },
  {
    icon: "gavel",
    title: "Reglas",
    desc: "Normas de competencia, puntualidad, juego limpio y sanciones.",
    action: { type: "pdf", href: "src\\assets\\documents\\REGLAS_MACHACHI_CUP.pdf" },
  },
  {
    icon: "forum",
    title: "Patrocinadores",
    desc: "Marcas y negocios que apoyan el torneo y sus beneficios para los participantes.",
    //action: { type: "pdf", href: "/documentos/patrocinadores.pdf" },
  },
  {
    icon: "verified",
    title: "Bonus adicionales por inscripción",
    desc: "Beneficios exclusivos para los equipos participantes.",
  },
]

export default function ReglasSection() {
  const [imagenVista, setImagenVista] = useState(null)

  useEffect(() => {
    if (!imagenVista) return undefined

    function handleKeyDown(event) {
      if (event.key === "Escape") setImagenVista(null)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [imagenVista])

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
              {regla.action?.type === "pdf" && (
                <a className="regla-card__action" href={regla.action.href} download>
                  Descargar PDF
                </a>
              )}
              {regla.action?.type === "image" && (
                <button
                  className="regla-card__action"
                  type="button"
                  onClick={() => setImagenVista(regla.action.src)}
                >
                  Ver imagen
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
      {imagenVista && (
        <div
          className="regla-imagen-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen de premios"
          onClick={(event) => {
            if (event.target === event.currentTarget) setImagenVista(null)
          }}
        >
          <div className="regla-imagen-modal__contenido">
            <button
              className="regla-imagen-modal__cerrar"
              type="button"
              aria-label="Cerrar imagen"
              onClick={() => setImagenVista(null)}
            >
              &times;
            </button>
            <img src={imagenVista} alt="Información de premios" />
          </div>
        </div>
      )}
    </section>
  )
}
