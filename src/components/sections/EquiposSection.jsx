import "./EquiposSection.css"
import { useEffect, useState } from "react"
import SectionHeader from "../atoms/SectionHeader"
import { suscribirEquipos } from "../../firebaseService"

function getSteamProfileURL(value) {
  if (typeof value !== "string") return ""
  try {
    const url = new URL(value)
    return url.protocol === "https:" && ["steamcommunity.com", "www.steamcommunity.com"].includes(url.hostname)
      ? url.href
      : ""
  } catch {
    return ""
  }
}

function getLogoURL(value) {
  if (typeof value !== "string") return ""
  try {
    const url = new URL(value)
    return url.protocol === "https:" ? url.href : ""
  } catch {
    return ""
  }
}

export default function EquiposSection() {
  const [equipos, setEquipos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const unsubscribe = suscribirEquipos(
      (data) => {
        setEquipos(data)
        setError(false)
        setLoading(false)
      },
      (err) => {
        console.error("Error cargando los equipos:", err)
        setError(true)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  return (
    <section className="section section--surface" id="equipos">
      <div className="container">
        <SectionHeader
          dataAos="fade-up"
          title="Equipos Preinscritos"
          subtitle={loading || error ? "Los equipos que están preinscritos en la competencia." : `${equipos.length} ${equipos.length === 1 ? "equipo preinscrito" : "equipos preinscritos"} hasta ahora.`}
        />

        {loading && <p className="equipos-msg">Cargando equipos...</p>}
        {error && <p className="equipos-msg equipos-msg--error">No se pudieron cargar los equipos. Intenta recargar la página.</p>}
        {!loading && !error && equipos.length === 0 && (
          <p className="equipos-msg">Aún no hay equipos preinscritos. ¡Sé el primero!</p>
        )}

        <div className="equipos-grid">
          {equipos.map((equipo, index) => (
            <article className="equipo-card" key={equipo.id}>
              <div className="equipo-card__header">
                <span className="equipo-card__num">{String(index + 1).padStart(2, "0")}</span>
                {getLogoURL(equipo.logoURL) && (
                  <img
                    className="equipo-card__logo"
                    src={getLogoURL(equipo.logoURL)}
                    alt={`Logo de ${equipo.nombreEquipo}`}
                  />
                )}
                <h3 className="equipo-card__name">{equipo.nombreEquipo}</h3>
              </div>
              <p className="equipo-card__capitan">
                <span className="equipo-card__role equipo-card__role--capitan">
                  <span className="material-symbols-outlined">shield_person</span>
                  Capitán
                </span>
                <strong className="equipo-card__player-name">{equipo.capitan}</strong>
                {equipo.capitanFriendID && <span className="equipo-card__friend-id">ID: {equipo.capitanFriendID}</span>}
                {getSteamProfileURL(equipo.capitanURL) && (
                  <a className="equipo-card__steam-link" href={getSteamProfileURL(equipo.capitanURL)} target="_blank" rel="noopener noreferrer">
                    Steam <span className="material-symbols-outlined">open_in_new</span>
                  </a>
                )}
              </p>
              <ul className="equipo-card__jugadores">
                {(equipo.jugadores || []).map((jugador, i) => {
                  const nick = typeof jugador === "string" ? jugador : jugador.nick
                  const profileURL = getSteamProfileURL(
                    typeof jugador === "string" ? equipo.steamURL?.[i] : jugador.steamURL,
                  )
                  const friendID = typeof jugador === "string" ? equipo.friendIDs?.[i] : jugador.friendID
                  return (
                    <li key={i}>
                      <div className="equipo-card__player-info">
                        <span className="equipo-card__role equipo-card__role--titular">Titular {i + 1}</span>
                        <strong className="equipo-card__player-name">{nick}</strong>
                        {friendID && <span className="equipo-card__friend-id">ID: {friendID}</span>}
                      </div>
                      {profileURL && (
                        <a className="equipo-card__steam-link" href={profileURL} target="_blank" rel="noopener noreferrer">
                          Steam <span className="material-symbols-outlined">open_in_new</span>
                        </a>
                      )}
                    </li>
                  )
                })}
              </ul>
              {equipo.suplente ? (
                <p className="equipo-card__suplente">
                  <span className="equipo-card__role equipo-card__role--suplente">Suplente</span>
                  <strong className="equipo-card__player-name">{equipo.suplente}</strong>
                  {equipo.suplenteFriendID && <span className="equipo-card__friend-id">ID: {equipo.suplenteFriendID}</span>}
                  {getSteamProfileURL(equipo.suplenteURL) && (
                    <a className="equipo-card__steam-link" href={getSteamProfileURL(equipo.suplenteURL)} target="_blank" rel="noopener noreferrer">
                      Steam <span className="material-symbols-outlined">open_in_new</span>
                    </a>
                  )}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
