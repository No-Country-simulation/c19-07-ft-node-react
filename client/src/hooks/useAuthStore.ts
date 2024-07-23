import { ProfileResponse } from "../interfaces";

import { AxiosError } from "axios";
import axios, { schoolMetricsApi } from "../apis/schoolMetricsApi";

import { useAppDispatch, useAppSelector } from "./reduxTypedHooks";
import {
  login,
  logout,
  clearErrorMessage,
  checkingCredentials,
} from "../store/auth/authSlice";

type LoginData = {
  email: string;
  password: string;
};

export const useAuthStore = () => {
  const dispatch = useAppDispatch();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  const startLogin = async ({ email, password }: LoginData) => {
    dispatch(clearErrorMessage());

    try {
      await axios.post("/auth/login", { email, password });

      const data = await getUserProfile();

      dispatch(login({ ...data }));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && !error.response.data.success) {
          dispatch(logout("Invalid credentials."));
        } else {
          dispatch(logout("Internal server error."));
        }
      } else if (error instanceof Error) {
        dispatch(logout("Error: " + error.message));
      } else {
        dispatch(logout("Unknown error:" + error));
      }
    }
  };

  const startLogout = async () => {
    dispatch(checkingCredentials());

    try {
      await axios.post("/auth/logout");

      dispatch(logout(null));
    } catch (error) {
      dispatch(logout(null));
    }
  };

  const startRefreshToken = async () => {
    try {
      await axios.post("/auth/refresh-token");

      const data = await getUserProfile();

      dispatch(login({ ...data }));
    } catch (error) {
      dispatch(logout(null));
    }
  };

  return {
    // * Properties
    user,
    status,
    errorMessage,

    // * Functions
    startLogin,
    startLogout,
    startRefreshToken,
  };
};

const getUserProfile = async () => {
  try {
    const response = await axios.get<ProfileResponse>(
      "/users/get-profile"
    );

    return response.data.data;
  } catch (error) {
    throw new Error("User profile could not be obtained");
  }
};
