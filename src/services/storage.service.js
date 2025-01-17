const TOKEN_KEY = "x-access-token";
const ROLE_KEY = "role";

/**
 * Manage how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instance.
 **/
const StorageService = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRole() {
    return localStorage.getItem(ROLE_KEY);
  },

  saveRole(role) {
    localStorage.setItem(ROLE_KEY, role);
  },

  removeRole() {
    localStorage.removeItem(ROLE_KEY);
  }
};

export default StorageService;
