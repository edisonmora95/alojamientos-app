export default {
  /** Formulario a llenar por el usuario */
  form: {
    id: 0,
    estado: "",

    zona: "",
    provincia: "",
    canton: "",
    parroquia: "",

    tipo: 1, // Por default el tipo es Infraestructura

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
    // CARACTERISTICAS DE TERRENO
    suelos: [],
    nivelTerreno: "",
    observacionNivel: "",
    pendienteInclinacion: 0,
    observacionPendiente: "",

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
  },
  /** Array de todos los formularios */
  forms: []
};
