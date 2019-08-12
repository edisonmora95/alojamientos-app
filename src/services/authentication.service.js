import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

export async function login({ email, password }) {
  const url = BASE_URL + routes.LOGIN;
  const payloadData = {
    email,
    password
  };
  try {
    const response = await ApiServcie.postApi(url, payloadData);
    ApiServcie.setHeaderAuth(response.body.data.token);
    return Promise.resolve(response.body.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout() {
  const url = BASE_URL + routes.LOGOUT;
  try {
    await ApiServcie.postApi(url);
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(error);
  }
}
