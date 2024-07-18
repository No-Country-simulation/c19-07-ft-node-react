import { useEffect } from "react";

import { useAuthStore } from "./useAuthStore";
import { schoolMetricsApi } from "../apis/schoolMetricsApi";

export const useAxiosPrivate = () => {
  const { status, startRefreshToken } = useAuthStore();

  useEffect(() => {
    const requestIntercept = schoolMetricsApi.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const responseIntercept = schoolMetricsApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // ? Refresh token
          await startRefreshToken();

          return schoolMetricsApi(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      schoolMetricsApi.interceptors.request.eject(requestIntercept);
      schoolMetricsApi.interceptors.response.eject(responseIntercept);
    };
  }, [status, startRefreshToken]);

  return schoolMetricsApi;
};
