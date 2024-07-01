// src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://farmlove.xyz",
  // baseURL: "https://46a0-149-102-244-26.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add token or other custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors (e.g., logging, user notifications)
    return Promise.reject(error);
  }
);

export default axiosInstance;
