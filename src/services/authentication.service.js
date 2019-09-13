import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

export async function login({ email, password }) {
  const url = BASE_URL + routes.LOGIN;
  const payloadData = {
    email,
    password
  };
  console.log(payloadData)
  try {
    const response = await ApiServcie.postApi(url, payloadData);
    ApiServcie.setHeader("x-access-token", response.data.data.token);
    return Promise.resolve(response.body.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout() {
  const url = BASE_URL + routes.LOGOUT;
  try {
    await ApiServcie.postApi(url);
    ApiServcie.setHeader("x-access-token", "");
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
