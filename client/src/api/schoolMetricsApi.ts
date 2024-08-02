import axios from "axios";

const schoolMetricsApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });
  
  export default schoolMetricsApi;