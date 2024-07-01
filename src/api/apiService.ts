// src/api/apiService.ts
import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

export const get = async <T>(url: string, params = {}): Promise<T> => {
  const response = await axiosInstance.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig<unknown>
): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data: unknown): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response = await axiosInstance.delete<T>(url);
  return response.data;
};
