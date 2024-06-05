import axios from "axios";
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage,
} from "../helpers/localstorage.helper.js";
const apiUrl = process.env.REACT_APP_API_URL;

export const instance = axios.create({
  baseURL: apiUrl,
});

const refreshAccessToken = async () => {
  try {
    const tokensRes = await instance.post("auth/refresh-tokens", {
      refreshToken: getTokenFromLocalStorage().refreshToken,
    });
    setTokenToLocalStorage(tokensRes.data);
    return true;
  } catch (err) {
    return false;
  }
};

instance.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${
    getTokenFromLocalStorage().accessToken || ""
  }`;
  return req;
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (!getTokenFromLocalStorage().refreshToken) {
        removeTokenFromLocalStorage();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        removeTokenFromLocalStorage();
        window.location.href = "/login";
        return Promise.reject(error);
      }
      axios.defaults.headers.common.Authorization = `Bearer ${
        getTokenFromLocalStorage().accessToken || ""
      }`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
