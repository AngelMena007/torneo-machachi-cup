import "./Navbar.css"
import { useState } from "react"

const LINKS = [
  { label: "Información", href: "#informacion" },
  { label: "Preinscripción", href: "#inscripcion" },
  { label: "Equipos Preinscritos", href: "#equipos" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="topnav">
      <div className="topnav__inner">
        <a className="topnav__logo" href="#inicio" onClick={() => setOpen(false)}>
          MACHACHI CUP
        </a>

        <button
          className={`nav-toggle__btn${open ? " is-open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`topnav__links${open ? " is-open" : ""}`}>
          {LINKS.map((link) => (
            <a key={link.href} className="topnav__link" href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
