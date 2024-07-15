import axios, { type AxiosRequestHeaders } from "axios";

const schoolMetricsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

type CustomAxiosRequestHeaders = AxiosRequestHeaders & {
  "x-token": string;
};

schoolMetricsApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  } as CustomAxiosRequestHeaders;

  return config;
});

export default schoolMetricsApi;
