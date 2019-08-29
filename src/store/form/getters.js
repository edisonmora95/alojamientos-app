export function form(state) {
  return state.form;
}

export function puntajeTotal(state) {
  return (
    state.form.puntajeAntecedentes +
    state.form.puntajeRiesgos +
    state.form.puntajeViasAcceso +
    state.form.puntajeServicios +
    state.form.puntajeEspacios +
    state.form.puntajeMedidasSeguridad +
    state.form.puntajeInfraestructura +
    state.form.puntajeAccesibilidad
  );
}

export function calificacion(state) {
  return state.form.calificacion;
}
