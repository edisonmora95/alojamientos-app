export default {
  zonas: [],
  provincias: [],
  cantones: [],
  parroquias: [],
  ubicaciones: [],
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
  isLoggedIn: false
};
