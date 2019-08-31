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
    zona: "",
    provincia: "",
    canton: "",
    parroquia: "",
    sector: "",
    referencia: "",
    principal: "",
    secundaria: "",

    tipo: 1,

    nombreInfraestructura: "",
    fechaInspeccion: "",
    horaInspeccion: "",

    tipoServicio: "",
    otroTipoServicio: "",
    institucion: "",
    nombreRepresentante: "Edison Mora",
    celularRepresentante: "+593992556793",
    convencionalRepresentante: "042348515",

    eventos: [],
    previoUso: false,
    anioUso: 0,

    amenazas: [],

    vias: [],

    servicios: [],

    dormitorios: [],

    banos: [],

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
