import { routes, BASE_URL } from "./routes";

import ApiServcie from "./api.service";

const ingresarFormulario = async formulario => {
  console.log(formulario);
  const url = BASE_URL + routes.INGRESAR_FORMULARIO;
  const payloadData = formulario;
  try {
    const response = await ApiServcie.postApi(url, payloadData);
    if (response.data.estado === "success") {
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  ingresarFormulario
};
