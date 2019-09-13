/**
 * @param {object[]} zonas Array de las zonas registradas en la base de datos
 */
export function setZonas(state, zonas) {
  state.zonas = zonas;
}

/**
 * @param {object[]} provincias Array de las provincias registradas en la base de datos
 */
export function setProvincias(state, provincias) {
  state.provincias = provincias;
}

/**
 * @param {object[]} cantones Array de los cantones registradas en la base de datos
 */
export function setCantones(state, cantones) {
  state.cantones = cantones;
}

/**
 * @param {object[]} parroquias Array de las parroquias registradas en la base de datos
 */
export function setParroquias(state, parroquias) {
  state.parroquias = parroquias;
}

/**
 * @param {object[]} ubicaciones Array de las ubicaciones registradas en la base de datos
 */
export function setUbicaciones(state, ubicaciones) {
  state.ubicaciones = ubicaciones;
}

export function setIsLoggedIn(state, isLoggedIn) {
  state.isLoggedIn = isLoggedIn;
}
