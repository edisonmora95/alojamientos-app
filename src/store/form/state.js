export default {
  zona: "",
  provincia: "",
  canton: "",
  parroquia: "",
  sector: "",
  referencia: "",
  principal: "",
  secundaria: "",

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
