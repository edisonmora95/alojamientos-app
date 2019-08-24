import FormService from "../../services/form.service";

export function ingresarFormulario({ commit }, payload) {
  // Formateando el formulario a enviar al servidor
  const form = Object.assign({}, payload);
  form["antecedentes"] = {
    puntaje: payload.puntajeAntecedentes,
    eventos: payload.eventos
  };
  form["amenazas"] = {
    puntaje: payload.puntajeRiesgos,
    amenazas: payload.amenazas
  };
  form["acceso"] = {
    puntaje: payload.puntajeViasAcceso,
    viasAcceso: payload.vias
  };
  form["servicios"] = {
    puntaje: payload.puntajeServicios,
    servicios: payload.servicios
  };
  delete form.eventos;
  delete form.vias;
  return FormService.ingresarFormulario(form).then(() => {
    commit("clearForm");
  });
}
