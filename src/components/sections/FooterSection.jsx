import "./FooterSection.css"

const LINKS = [
  { label: "Reglas", href: "#reglas" },
  { label: "Inscripción", href: "#inscripcion" },
  { label: "Equipos inscritos", href: "#equipos" },
]

export default function FooterSection() {
  return (
    <footer className="footer">
      <hr className="footer__hr" />
      <div className="footer__cols container">
        <div className="footer__brand">
          <span className="footer__logo">Machachi Cup</span>
          <p className="footer__tagline">
            Domina las líneas, coordina con tu equipo, derrota a tus enemigos y destruye el Ancestro rival para reclamar la victoria. <br />
            Demuestra tu habilidad, estrategia y poder en nuestro torneo de <span style={{ fontWeight: 'bold' }}>Dota 2</span>.
            <br />
            <br />
            ¿Tienes lo necesario para convertirte en una leyenda?
            <br />
            <span style={{ fontWeight: 'bold' }}>¡Inscríbete ahora y demuestra de qué estás hecho!</span>
          </p>
        </div>

        <div className="footer__col">
          <h5 className="footer__col-title">Navegación</h5>
          <ul className="footer__links">
            {LINKS.map((link) => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__separator"></div>
      <div className="footer__bottom">
        <p>© 2026 Machachi Cup. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
