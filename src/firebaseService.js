import { db } from "./firebase"
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"

/**
 * Guarda una inscripción en dos colecciones:
 *  - "equipos":   datos públicos (se muestran en la web)
 *  - "contactos": datos de contacto del capitán (privado, solo escritura)
 */
export async function inscribirEquipo({
  nombreEquipo,
  capitan,
  capitanFriendID,
  capitanURL,
  jugadores,
  steamURL,
  friendIDs,
  logoURL,
  suplente,
  suplenteFriendID,
  suplenteURL,
  discord,
  whsp,
}) {
  const equipoRef = await addDoc(collection(db, "equipos"), {
    nombreEquipo,
    capitan,
    capitanFriendID,
    capitanURL,
    jugadores,
    steamURL,
    friendIDs,
    logoURL: logoURL || "",
    suplente: suplente || "",
    suplenteFriendID: suplente ? suplenteFriendID : "",
    suplenteURL: suplente ? suplenteURL : "",
    creadoEn: serverTimestamp(),
  })

  await addDoc(collection(db, "contactos"), {
    equipoId: equipoRef.id,
    discord,
    whsp,
    creadoEn: serverTimestamp(),
  })

  return equipoRef.id
}

/** Escucha en tiempo real los equipos inscritos. Devuelve la función para cancelar la suscripción. */
export function suscribirEquipos(onData, onError) {
  const q = query(collection(db, "equipos"), orderBy("creadoEn", "asc"))
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  )
}