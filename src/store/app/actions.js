import AuthenticationService from "../../services/authentication.service";

export async function sincronizarDatosApp({ commit }) {
  const data = await AuthenticationService.sincronizarDatos();
  if (data.zonas.length > 0) {
    commit("setZonas", data.zonas);
    commit("setProvincias", data.provincias);
    commit("setCantones", data.cantones);
    commit("setParroquias", data.parroquias);
    commit("setUbicaciones", data.ubicaciones);
    commit("setDatosApp", data.datos);
    return data;
  }
  return null;
}

export async function login({ commit }, payload) {
  await AuthenticationService.login(payload);
  commit("setIsLoggedIn", true);
}

export async function logout({ commit }) {
  await AuthenticationService.logout();
  commit("setIsLoggedIn", false);
}
