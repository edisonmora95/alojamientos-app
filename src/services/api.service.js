import axios from "axios";

const ApiService = {
  setHeader(key, value) {
    axios.headers.common[key] = value;
  },
  setHeaderAuth(token) {
    axios.headers.common["Authorization"] = `Bearer ${token}`;
  },
  removeHeaderAuth() {
    axios.headers.common["Authorization"] = "";
  },
  getApi(url, queryData) {
    return axios.get(url, queryData);
  },
  postApi(url, payloadData, options) {
    if (!options) {
      options = {};
    }
    return axios.post(url, payloadData, options);
  },
  putApi(url, payloadData) {
    return axios.put(url, payloadData);
  },
  deleteApi(url, payloadData) {
    return axios.delete(url, payloadData);
  }
};

export default ApiService;
