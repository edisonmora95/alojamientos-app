import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";
import StorageService from "./storage.service";

export async function login({ email, password }) {
  const url = BASE_URL + routes.LOGIN;
  const payloadData = {
    email,
    password
  };
  try {
    const response = await ApiServcie.postApi(url, payloadData);
    if (response.data.status === "success") {
      ApiServcie.setHeader("x-access-token", response.data.data);
      StorageService.saveToken(response.data.data);
      return Promise.resolve(response.data.data);
    } else {
      StorageService.removeToken();
      return Promise.reject(response.data.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout() {
  try {
    ApiServcie.setHeader("x-access-token", "");
    StorageService.removeToken();
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function sincronizarDatos() {
  const url = BASE_URL + routes.SINCRONIZAR_DATOS;

  try {
    const response = await ApiServcie.getApi(url);
    return Promise.resolve(response.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export default {
  login,
  logout,
  sincronizarDatos
};
