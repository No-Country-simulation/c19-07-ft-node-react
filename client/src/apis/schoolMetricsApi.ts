import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL_V1,
  withCredentials: true,
});

export const schoolMetricsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
