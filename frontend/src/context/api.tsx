import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("APP-TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
