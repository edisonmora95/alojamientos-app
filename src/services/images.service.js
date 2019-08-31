import ApiServcie from "./api.service";

const clientId = "546c25a59c58ad7";
const BASE_URL = "https://api.imgur.com/3";

const subirImagen = async imagen => {
  try {
    const url = BASE_URL + "/image";
    // ApiServcie.setHeader("Authorization", `Client-ID ${clientId}`);

    const formData = new FormData();
    formData.set("image", imagen);

    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Client-ID ${clientId}`
        // "Access-Control-Allow-Origin": "*"
      }
    };

    const response = await ApiServcie.postApi(url, formData, options);
    return response;
  } catch (error) {
    return error;
  }
};

export default {
  subirImagen
};
