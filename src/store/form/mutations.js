export function updateForm(state, payload) {
  for (let key in payload) {
    state[key] = payload[key];
  }
}

/**
 * @param {object} payload
 * @param {string} payload.seccion Sección a la cual se va a puntuar
 * @param {number} payload.puntaje Puntaje a añadir a la sección
 */
export function setPuntajeSeccion(state, payload) {
  state[payload.seccion] = payload.puntaje;
}
