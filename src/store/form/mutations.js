/**
 * Actualiza los campos del formulario del store que coinciden con los campos enviados en el payload
 * @param {object} payload
 */
export function updateForm(state, payload) {
  for (let key in payload) {
    state.form[key] = payload[key];
  }
}

/**
 * @param {object} payload
 * @param {string} payload.seccion Sección a la cual se va a puntuar
 * @param {number} payload.puntaje Puntaje a añadir a la sección
 */
export function setPuntajeSeccion(state, payload) {
  state.form[payload.seccion] = payload.puntaje;
}

/**
 * "Limpia" el registro de formulario para que el usuario pueda ingresar uno nuevo
 */
export function clearForm(state) {
  state.form = {
    id: 0,
    estado: "",

    zona: "",
    provincia: "",
    canton: "",
    parroquia: "",

    tipo: 1,

    infraestructura: {
      id: null,
      nombre: "",
      direccion: {
        callePrincipal: "",
        calleSecundaria: "",
        sector: "",
        puntoReferencia: ""
      },
      coordenadas: {
        easting: 0,
        northing: 0,
        zoneLetter: "",
        zoneNum: 0
      },
      tipoServicio: "",
      otroTipoServicio: "",
      institucion: {
        id: null,
        nombre: "",
        nombreRepresentante: "",
        celularRepresentante: "",
        convencionalRepresentante: ""
      }
    },

    fechaInspeccion: "",
    horaInspeccion: "",
    usoPrevio: false,
    anioUso: 2019,

    eventos: [],

    amenazas: [],

    vias: [],

    servicios: [],

    dormitorios: [],

    banos: [],

    espaciosTerreno: [],

    recursos: [],
    instituciones: [],

    paredes: [],
    pisos: [],
    techos: [],
    ingresosSalidas: [],
    otrosEspacios: [],

    zonaArriboVehicular: "",
    areaCirculacion: "",
    comunicacion: false,
    caracteristicas: [],

    anexos: [],

    recomendaciones: "",
    puntaje: 0,
    calificacion: "",

    // PUNTAJES DE SECCIONES
    puntajeAntecedentes: 0,
    puntajeRiesgos: 0,
    puntajeViasAcceso: 0,
    puntajeServicios: 0,
    puntajeEspacios: 0,
    puntajeMedidasSeguridad: 0,
    puntajeInfraestructura: 0,
    puntajeAccesibilidad: 0
  };
}

/**
 * Ingresa el valor final de la calificacion del formulario
 * @param {string} calificacion APTO | NO APTO
 */
export function setCalificacionGeneral(state, calificacion) {
  state.form.calificacion = calificacion;
}

/**
 * Ingresa el registro del formulario en el array de formularios almacenados
 * @param {object} form Formulario a guardar
 */
export function saveForm(state, form) {
  state.forms.push(form);
}

/**
 * Setea los valores del formulario actual del store con los valores enviados en el payload
 * @param {object} form Formulario a presentar como actual en el store
 */
export function setActualForm(state, form) {
  state.form = form;
}

/**
 * Setea el estado del formulario actual
 * Posibles estados:
 *   * GUARDADO -> Solo se encuentra guardado en memoria
 *   * ENVIADO  -> Se encuentra guardado en memoria y fue enviado al servidor
 */
export function setEstado(state, estado) {
  state.form.estado = estado;
}
