export default {
  form: {
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
  },
  forms: []
};
