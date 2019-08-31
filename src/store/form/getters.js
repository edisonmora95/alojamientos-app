/**
 * Retorna el formulario actual que se encuentra en el store
 */
export function form(state) {
  return state.form;
}

/**
 * Retorna la suma de los puntajes de todas las secciones del formulario
 */
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

/**
 * Retorna la calificación del formulario actual que se encuentra en el store
 */
export function calificacion(state) {
  return state.form.calificacion;
}

/**
 * Retorna todos los formularios almacenados en el store
 */
export function forms(state) {
  return state.forms;
}

export function formsInfraestructuras(state) {
  return state.forms.filter(form => form.tipo === 1);
}

export function formsTerrenos(state) {
  return state.forms.filter(form => form.tipo === 2);
}
