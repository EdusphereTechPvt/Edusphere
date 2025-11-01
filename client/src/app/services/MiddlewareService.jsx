import axios from "axios";
import store from "../store";
import { setCredentials, logout, setConnectionStatus, setLogout } from "../store/AuthSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken, user } = res.data;

        store.dispatch(setCredentials({ user, accessToken }));
        store.dispatch(setConnectionStatus("connected"));

        processQueue(null, accessToken);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = "Bearer " + accessToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;
        store.dispatch(setLogout());
        window.location.href = "/auth/login";
        return Promise.reject(err);
      }
    }

    if(error.response?.status === 403){
        window.location.href = '/error/403'
    }
    if(error.response?.status === 401){
        window.location.href = '/error/401'
    }

    return Promise.reject(error);
  }
);

export default api;
