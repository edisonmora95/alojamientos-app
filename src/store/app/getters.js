export const zonas = state => state.zonas;

export const provincias = state => zonaId =>
  state.provincias.filter(provincia => provincia.zona == zonaId);

export const cantones = state => provinciaId =>
  state.cantones.filter(canton => canton.provincia == provinciaId);

export const parroquias = state => cantonId =>
  state.parroquias.filter(parroquia => parroquia.canton == cantonId);

export const validaciones = state => state.validaciones;

export const isLoggedIn = state => state.isLoggedIn;

export const ubicacionesTipo = state => tipo =>
  state.ubicaciones
    .filter(ubicacion => ubicacion.tipo === tipo)
    .map(ubicacion => {
      return {
        id: ubicacion.id,
        nombre: ubicacion.nombre,
        direccion: {
          callePrincipal: ubicacion.callePrincipal,
          calleSecundaria: ubicacion.calleSecundaria,
          sector: ubicacion.sector,
          puntoReferencia: ubicacion.puntoReferencia,
        },
        tipoServicio: ubicacion.tipoServicio,
        otroTipoServicio: "",
        coordenadas: {
          easting: 0,
          northing: 0,
          zoneLetter: "",
          zoneNum: 0
        },
        institucion: {
          id: 0,
          nombre: "",
          nombreRepresentante: "",
          celularRepresentante: "",
          convencionalRepresentante: ""
        }
      };
    });

/*export function infraestructuras(state) {
  return state.infraestructuras;
}

export function instituciones(state) {
  return state.instituciones;
}*/
