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
          puntoReferencia: ubicacion.puntoReferencia
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

export const tiposEvento = state => state.tiposEvento.map(tipo => tipo.nombre);
export const tiposDano = state => state.tiposDano.map(tipo => tipo.nombre);
export const tiposAmenaza = state =>
  state.tiposAmenaza.map(tipo => tipo.nombre);
export const viasAcceso = state => state.viasAcceso.map(tipo => tipo.nombre);
export const tiposServicio = state =>
  state.tiposServicio.map(tipo => tipo.nombre);
export const tiposEspacioInfraestructura = state =>
  state.tiposEspacioInfraestructura.map(tipo => tipo.nombre);
export const tiposRecursoInterno = state =>
  state.tiposRecursoInterno.map(tipo => tipo.nombre);
export const tiposInsitucionEmergencia = state =>
  state.tiposInsitucionEmergencia.map(tipo => tipo.nombre);
export const tiposSuelo = state => state.tiposSuelo.map(tipo => tipo.nombre);
export const tiposMaterialInfraestructura = state =>
  state.tiposMaterialInfraestructura.map(tipo => tipo.nombre);
export const tiposOtrosEspaciosInfraestructura = state =>
  state.tiposOtrosEspaciosInfraestructura.map(tipo => tipo.nombre);
export const caracteristicasCirculacion = state =>
  state.caracteristicasCirculacion.map(tipo => tipo.nombre);
export const tiposTecho = state =>
  state.tiposMaterialInfraestructuraTecho.map(tipo => tipo.nombre);
