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

export function setDatosApp(state, datos) {
  state.tiposEvento = datos.filter(dato => dato.tipo === "EVENTO");
  state.tiposDano = datos.filter(dato => dato.tipo === "TIPO_DANO");
  state.tiposAmenaza = datos.filter(dato => dato.tipo === "TIPO_AMENAZA");
  state.viasAcceso = datos.filter(dato => dato.tipo === "VIA_ACCESO");
  state.tiposServicio = datos.filter(
    dato => dato.tipo === "TIPO_SERVICIO_BASICO"
  );
  state.tiposEspacioInfraestructura = datos.filter(
    dato => dato.tipo === "TIPO_ESPACIO_INFRAESTRUCTURA"
  );
  state.tiposRecursoInterno = datos.filter(
    dato => dato.tipo === "TIPO_RECURSO_INTERNO"
  );
  state.tiposInsitucionEmergencia = datos.filter(
    dato => dato.tipo === "TIPO_INSTITUCION"
  );
  state.tiposSuelo = datos.filter(dato => dato.tipo === "TIPO_SUELO");
  state.tiposMaterialInfraestructura = datos.filter(
    dato => dato.tipo === "TIPO_MATERIAL_INFRAESTRUCTURA"
  );
  state.tiposOtrosEspaciosInfraestructura = datos.filter(
    dato => dato.tipo === "OTRO_ESPACIO_INFRAESTRUCTURA"
  );
  state.caracteristicasCirculacion = datos.filter(
    dato => dato.tipo === "CARACTERISTICA_CIRCULACION"
  );
  state.tiposMaterialInfraestructuraTecho = datos.filter(
    dato => dato.tipo === "TIPO_MATERIAL_INFRAESTRUCTURA_TECHO"
  );
}
