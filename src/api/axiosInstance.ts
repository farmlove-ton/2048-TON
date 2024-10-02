// src/api/axiosInstance.ts
import axios from "axios";
import * as Sentry from "@sentry/react";

import { getInitData } from "../lib/telegram";

const axiosInstance = axios.create({
  // baseURL: "https://farmlove.xyz:18081",
  baseURL: "https://b14e-134-209-23-85.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const initData = getInitData();

    if (initData) {
      config.headers.Authorization = JSON.stringify(initData);
    }

    return config;
  },
  (error) => {
    Sentry.captureException(error);
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
