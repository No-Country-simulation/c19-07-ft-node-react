import { useAppDispatch, useAppSelector } from "./reduxTypedHooks";

import axios from "../apis/schoolMetricsApi";
import { login, logout, checkingCredentials } from "../store/auth/authSlice";

type LoginData = {
  email: string;
  password: string;
};

export const useAuthStore = () => {
  const dispatch = useAppDispatch();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  const startLogin = async ({ email, password }: LoginData) => {
    dispatch(checkingCredentials());

    try {
      await axios.post("/auth/login", { email, password });

      const { data } = await axios.get("/users/profile");

      dispatch(login({ ...data }));
    } catch (error) {
      console.log(error);

      dispatch(logout(null));
    }
  };

  const startLogout = async () => {
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

      const { data } = await axios.get("/users/profile");

      dispatch(login({ ...data }));
    } catch (error) {
      await startLogout();
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
