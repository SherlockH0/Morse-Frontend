import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { isAuthenticatedStore, userStore } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_PROTOCOL + import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export async function refreshToken(
  failedRequest: any | null = null,
): Promise<any> {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  try {
    const response = await axios.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem(ACCESS_TOKEN, response.data.access);

    isAuthenticatedStore.set(true);

    failedRequest.response.config.headers["Authorization"] =
      "Bearer " + response.data.access;
  } catch (error) {
    isAuthenticatedStore.set(false);
    return Promise.reject(error);
  }
}

createAuthRefreshInterceptor(api, refreshToken);

export default api;
