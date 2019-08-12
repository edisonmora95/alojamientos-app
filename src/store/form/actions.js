import FormService from "../../services/form.service";

export function ingresarFormulario({ commit }, payload) {
  return FormService.ingresarFormulario(payload).then(() => {
    commit("clearForm");
  });
}
