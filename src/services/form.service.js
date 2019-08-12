import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

const ingresarFormulario = async formulario => {
  const url = BASE_URL + routes.INGRESAR_FORMULARIO;
  const payloadData = formulario;
  try {
    const response = await ApiServcie.postApi(url, payloadData);
    return Promise.resolve(response.body.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  ingresarFormulario
};
