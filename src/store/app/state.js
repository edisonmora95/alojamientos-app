export default {
  zonas: [],
  provincias: [],
  cantones: [],
  parroquias: [],
  ubicaciones: [],
  infraestructuras: [
    {
      id: 0,
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
        id: 0,
        nombre: "",
        nombreRepresentante: "",
        celularRepresentante: "",
        convencionalRepresentante: ""
      }
    },
    {
      id: 1,
      nombre: "Infraestructura 1",
      direccion: {
        callePrincipal: "Calle 1",
        calleSecundaria: "Calle 1-2",
        sector: "Sector 1",
        puntoReferencia: "Por ahí"
      },
      coordenadas: {
        easting: 0,
        northing: 0,
        zoneLetter: "",
        zoneNum: 0
      },
      tipoServicio: "Escuela",
      otroTipoServicio: "",
      institucion: {
        id: 1,
        nombre: "ESPOL",
        nombreRepresentante: "Edison Mora",
        celularRepresentante: "0992556793",
        convencionalRepresentante: "042348515"
      }
    },
    {
      id: 2,
      nombre: "Infraestructura 2",
      direccion: {
        callePrincipal: "Calle 2",
        calleSecundaria: "Calle 2-2",
        sector: "Sector 2",
        puntoReferencia: "Por allá"
      },
      coordenadas: {
        easting: 0,
        northing: 0,
        zoneLetter: "",
        zoneNum: 0
      },
      tipoServicio: "Colegio",
      institucion: {
        id: 2,
        nombre: "UCSG",
        nombreRepresentante: "Agustin Delgado",
        celularRepresentante: "0992556792",
        convencionalRepresentante: "042348514"
      }
    }
  ],
  instituciones: [
    {
      id: 1,
      nombre: "ESPOL",
      nombreRepresentante: "Edison Mora",
      celularRepresentante: "0992556793",
      convencionalRepresentante: "042348515"
    },
    {
      id: 2,
      nombre: "UCSG",
      nombreRepresentante: "Agustin Delgado",
      celularRepresentante: "0992556792",
      convencionalRepresentante: "042348514"
    },
    {
      id: 3,
      nombre: "USM",
      nombreRepresentante: "Nombre",
      celularRepresentante: "0992556791",
      convencionalRepresentante: "042348513"
    }
  ],
  validaciones: {
    required(val) {
      return !!val || "Este campo es obligatorio";
    },
    min3(val) {
      return val.length >= 3 || "Debe ingresar mínimo 3 caracteres";
    },
    numberPositive(val) {
      return val > 0 || "Valor debe ser positivo";
    }
  },
  isLoggedIn: false,
};
