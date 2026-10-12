import "./InscripcionSection.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { inscribirEquipo } from "../../firebaseService"

const initialForm = {
  nombreEquipo: "",
  logoURL: "",
  capitan: "",
  capitanFriendID: "",
  capitanURL: "",
  discord: "",
  whsp: "",
  jugadores: ["", "", "", ""],
  steamURL: ["", "", "", ""],
  friendIDs: ["", "", "", ""],
  suplente: "",
  suplenteFriendID: "",
  suplenteURL: "",
}

const regexDiscord = /^(?!(?:everyone|here)$)[a-z0-9_](?:[a-z0-9_]|[.](?![.])){0,30}[a-z0-9_]?$/;

function isSteamProfileURL(value) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && ["steamcommunity.com", "www.steamcommunity.com"].includes(url.hostname)
  } catch {
    return false
  }
}

function isSecureURL(value) {
  try {
    return new URL(value).protocol === "https:"
  } catch {
    return false
  }
}

export default function InscripcionSection() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState("idle")
  const [feedback, setFeedback] = useState("")

  function resetStatus() {
    if (status !== "idle" && status !== "sending") {
      setStatus("idle")
      setFeedback("")
    }
  }

  function handleChange(event) {
    const { id, value } = event.target
    setForm((prev) => ({ ...prev, [id]: value }))
    resetStatus()
  }

  function handleJugador(index, value) {
    setForm((prev) => {
      const jugadores = [...prev.jugadores]
      jugadores[index] = value
      return { ...prev, jugadores }
    })
    resetStatus()
  }

  function handleSteamURL(index, value) {
    setForm((prev) => {
      const steamURL = [...prev.steamURL]
      steamURL[index] = value
      return { ...prev, steamURL }
    })
    resetStatus()
  }

  function handleFriendID(index, value) {
    setForm((prev) => {
      const friendIDs = [...prev.friendIDs]
      friendIDs[index] = value
      return { ...prev, friendIDs }
    })
    resetStatus()
  }

  function fail(message) {
    setStatus("error")
    setFeedback(message)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (status === "sending") return

    const data = {
      nombreEquipo: form.nombreEquipo.trim(),
      logoURL: form.logoURL.trim(),
      capitan: form.capitan.trim(),
      capitanFriendID: form.capitanFriendID.trim(),
      capitanURL: form.capitanURL.trim(),
      discord: form.discord.trim().toLowerCase(),
      whsp: form.whsp.trim(),
      jugadores: form.jugadores.map((j) => j.trim()),
      steamURL: form.steamURL.map((j) => j.trim()),
      friendIDs: form.friendIDs.map((id) => id.trim()),
      suplente: form.suplente.trim(),
      suplenteFriendID: form.suplenteFriendID.trim(),
      suplenteURL: form.suplenteURL.trim(),
    }

    if (data.nombreEquipo.length < 2) return fail("El nombre del equipo debe tener al menos 2 caracteres.")
    if (data.logoURL && !isSecureURL(data.logoURL)) return fail("Ingresa una URL HTTPS válida para el logo.")
    if (!data.capitan || !data.whsp) return fail("Completa todos los campos obligatorios.")
    if (!data.capitanFriendID) return fail("Ingresa el Friend ID del capitán.")
    if (data.whsp.length !== 10) return fail("Ingresa un número de WhatsApp válido.")
    if (!regexDiscord.test(data.discord)) return fail("Ingresa un usuario de discord válido.")
    if (data.jugadores.some((j) => !j)) return fail(`Debes ingresar los ${data.jugadores.length} jugadores titulares.`)
    if (data.friendIDs.some((id) => !id)) return fail("Debes ingresar el Friend ID de cada jugador titular.")
    if (![data.capitanURL, ...data.steamURL].every(isSteamProfileURL)) {
      return fail(`Ingresa un enlace HTTPS válido de perfil de Steam para el capitán y los ${data.jugadores.length} titulares.`)
    }
    if (data.suplente && !isSteamProfileURL(data.suplenteURL)) {
      return fail("Ingresa un enlace HTTPS válido de perfil de Steam para el suplente.")
    }
    if (data.suplente && !data.suplenteFriendID) {
      return fail("Ingresa el Friend ID del suplente.")
    }

    setStatus("sending")
    setFeedback("")

    try {
      await inscribirEquipo(data)
      setStatus("success")
      setFeedback("✓ ¡Equipo preinscrito correctamente! \n Te contactaremos por Discord o WhatsApp para proceder con la inscripción oficial y el pago.")
      setForm(initialForm)
      toast.success("¡Equipo inscrito correctamente!")
    } catch (error) {
      console.error("Error al preinscribir el equipo:", error)
      fail("✗ No se pudo completar la preinscripción. Intenta de nuevo.")
      toast.error("Error al preinscribir el equipo")
    }
  }

  return (
    <section className="section section--dark" id="inscripcion">
      <div className="container">
        <div className="inscripcion-grid">
          <div className="inscripcion-info" data-aos="fade-right">
            <h2 className="section__title section__title--white">Preinscribe a tu equipo</h2>
            <p className="inscripcion-info__sub">
              Completa el siguiente formulario con los datos de tu equipo. Asegúrate de que la información sea correcta, ya que será utilizada para contactarte de inmediato.
            </p>
            <ul className="inscripcion-info__list">
              <li><span className="material-symbols-outlined">groups</span> 5 jugadores titulares + 1 suplente opcional</li>
              <li><span className="material-symbols-outlined">badge</span> Un capitán responsable por equipo</li>
              <li><span className="material-symbols-outlined">mail</span> Te contactaremos por Discord o Whatsapp</li>
            </ul>
          </div>

          <div className="inscripcion-form-wrap" data-aos="fade-left">
            <form className="inscripcion-form" onSubmit={handleSubmit}>
              <div className="field field--dark">
                <label className="field__label field__label--dark" htmlFor="nombreEquipo">Nombre del equipo:</label>
                <input
                  className="field__input field__input--dark"
                  id="nombreEquipo"
                  type="text"
                  maxLength={40}
                  placeholder="Los Cóndores"
                  value={form.nombreEquipo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field field--dark">
                <label className="field__label field__label--dark" htmlFor="logoURL">URL del logo del equipo (opcional):</label>
                <input
                  className="field__input field__input--dark"
                  id="logoURL"
                  type="url"
                  maxLength={2000}
                  placeholder="https://ejemplo.com/logo.png"
                  value={form.logoURL}
                  onChange={handleChange}
                />
              </div>

              <fieldset className="inscripcion-form__capitan">
                <legend className="field__label field__label--dark">Datos del capitán</legend>
                <div className="inscripcion-form__jugador-row">
                  <div className="field field--dark">
                    <input
                      className="field__input field__input--dark"
                      id="capitan"
                      type="text"
                      maxLength={40}
                      placeholder="Nickname"
                      value={form.capitan}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field field--dark">
                    <input
                      className="field__input field__input--dark"
                      id="capitanFriendID"
                      type="text"
                      maxLength={40}
                      placeholder="Friend ID"
                      value={form.capitanFriendID}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field field--dark">
                  <input
                    className="field__input field__input--dark"
                    id="capitanURL"
                    type="url"
                    placeholder="https://steamcommunity.com/id/usuario"
                    value={form.capitanURL}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="inscripcion-form__row">
                  <div className="field field--dark">
                    <label className="field__label field__label--dark" htmlFor="discord">Discord:</label>
                    <input
                      className="field__input field__input--dark"
                      id="discord"
                      type="text"
                      maxLength={30}
                      placeholder="capitan#0000"
                      value={form.discord}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field field--dark">
                    <label className="field__label field__label--dark" htmlFor="whsp">WhatsApp:</label>
                    <input
                      className="field__input field__input--dark"
                      id="whsp"
                      type="text"
                      maxLength={10}
                      placeholder="09XXXXXXXX"
                      value={form.whsp}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset className="inscripcion-form__jugadores">
                <legend className="field__label field__label--dark">Datos de los jugadores titulares</legend>
                {form.jugadores.map((jugador, index) => (
                  <div className="inscripcion-form__jugador" key={index}>
                    <div className="inscripcion-form__jugador-row">
                      <div className="field field--dark">
                        <label className="field__label field__label--dark" htmlFor={`jugador-${index}`}>
                          Datos del jugador {index + 2}:
                        </label>
                        <input
                          className="field__input field__input--dark"
                          id={`jugador-${index}`}
                          type="text"
                          maxLength={30}
                          placeholder="Nickname"
                          value={jugador}
                          onChange={(e) => handleJugador(index, e.target.value)}
                          required
                        />
                      </div>
                      <div className="field field--dark">
                        <label className="field__label field__label--dark">&nbsp;</label>
                        <input
                          className="field__input field__input--dark"
                          id={`friendID-${index}`}
                          type="text"
                          maxLength={40}
                          placeholder="Friend ID"
                          value={form.friendIDs[index]}
                          onChange={(e) => handleFriendID(index, e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="field field--dark">
                      <input
                        className="field__input field__input--dark"
                        id={`steamURL-${index}`}
                        type="url"
                        placeholder="https://steamcommunity.com/id/usuario"
                        value={form.steamURL[index]}
                        onChange={(e) => handleSteamURL(index, e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}
              </fieldset>

              <div className="inscripcion-form__jugador-row">
                <div className="field field--dark">
                  <label className="field__label field__label--dark" htmlFor="suplente">Datos del suplente (opcional):</label>
                  <input
                    className="field__input field__input--dark"
                    id="suplente"
                    type="text"
                    maxLength={30}
                    placeholder="Nickname"
                    value={form.suplente}
                    onChange={handleChange}
                  />
                </div>
                <div className="field field--dark">
                  <label className="field__label field__label--dark" htmlFor="suplenteFriendID">&nbsp;</label>
                  <input
                    className="field__input field__input--dark"
                    id="suplenteFriendID"
                    type="text"
                    maxLength={40}
                    placeholder="Friend ID"
                    value={form.suplenteFriendID}
                    onChange={handleChange}
                    required={Boolean(form.suplente.trim())}
                  />
                </div>
              </div>

              <div className="field field--dark">
                <input
                  className="field__input field__input--dark"
                  id="suplenteURL"
                  type="url"
                  placeholder="https://steamcommunity.com/id/usuario"
                  value={form.suplenteURL}
                  onChange={handleChange}
                  required={Boolean(form.suplente.trim())}
                />
              </div>

              <button className="btn btn--primary btn--block" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Preinscribiendo..." : "Preinscribir mi equipo"}
              </button>

              {status === "success" && <p className="form-feedback form-feedback--ok">{feedback}</p>}
              {status === "error" && <p className="form-feedback form-feedback--error">{feedback}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
