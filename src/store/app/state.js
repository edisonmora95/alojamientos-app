export default {
  zonas: [
    { value: "1", label: "Zona 1" },
    { value: "2", label: "Zona 2" },
    { value: "3", label: "Zona 3" },
    { value: "4", label: "Zona 4" },
    { value: "5", label: "Zona 5-8" },
    { value: "6", label: "Zona 6" },
    { value: "7", label: "Zona 7" },
    { value: "9", label: "Zona 9" }
  ],
  provincias: [
    { value: "1", label: "Esmeraldas" },
    { value: "2", label: "Imbabura" },
    { value: "3", label: "Sucumbios" },
    { value: "4", label: "Orellana" },
    { value: "5", label: "Napo" },
    { value: "6", label: "Cotopaxi" },
    { value: "7", label: "Chimborazo" },
    { value: "8", label: "Tungurahua" },
    { value: "9", label: "Pastaza" },
    { value: "10", label: "Manabi" }
  ],
  cantones: [{ value: "1", label: "Cuenca" }],
  parroquias: [
    { value: "1", label: "Banos" },
    { value: "2", label: "San Joaquin" },
    { value: "3", label: "Sayausi" }
  ],
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
  }
};
