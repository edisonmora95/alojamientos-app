export function form(state) {
  return state;
}

export function puntajeTotal(state) {
  return (
    state.puntajeAntecedentes +
    state.puntajeRiesgos +
    state.puntajeViasAcceso +
    state.puntajeServicios +
    state.puntajeEspacios +
    state.puntajeMedidasSeguridad +
    state.puntajeInfraestructura +
    state.puntajeAccesibilidad
  );
}

export function calificacion(state) {
  return state.calificacion;
}
