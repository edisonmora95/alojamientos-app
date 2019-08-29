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
  return state.form;
}

/**
 * Ingresa el valor final de la calificacion del formulario
 * @param {string} calificacion APTO | NO APTO
 */
export function setCalificacionGeneral(state, calificacion) {
  state.form.calificacion = calificacion;
}

export function addForm(state, form) {
  state.forms.push(form);
}
