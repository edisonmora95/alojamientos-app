export const zonas = state => state.zonas;

export const provincias = state => zonaId =>
  state.provincias.filter(provincia => provincia.zona == zonaId);

export const cantones = state => provinciaId =>
  state.cantones.filter(canton => canton.provincia == provinciaId);

export const parroquias = state => cantonId =>
  state.parroquias.filter(parroquia => parroquia.canton == cantonId);

export const validaciones = state => state.validaciones;

/*export function infraestructuras(state) {
  return state.infraestructuras;
}

export function instituciones(state) {
  return state.instituciones;
}*/
