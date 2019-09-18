import StorageService from "../services/storage.service.js";
import ApiService from "../services/api.service";
import store from "../store";

const generalGuard = async (to, from, next) => {
  try {
    const accessToken = StorageService.getToken();
    const isLoggedIn = store().getters["app/isLoggedIn"];
    if (to.matched.some(record => record.meta.requiresLogin)) {
      if (!accessToken) {
        next({ name: "login" });
      } else if (!isLoggedIn) {
        ApiService.setHeader("x-access-token", accessToken);
        store().commit("app/setIsLoggedIn", true);
        next();
      } else {
        next();
      }
    } else if (to.matched.some(record => record.meta.public)) {
      if (!accessToken) {
        next();
      } else {
        if (!isLoggedIn) {
          ApiService.setHeader("x-access-token", accessToken);
          store().commit("app/setIsLoggedIn", true);
          next({ name: "formularios" });
        }
      }
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    next({ name: "login" });
  }
};

export default {
  generalGuard
};
