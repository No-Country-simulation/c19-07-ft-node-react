import { useAppDispatch, useAppSelector } from "./reduxTypedHooks";

import schoolMetricsApi from "../apis/schoolMetricsApi";
import { login, logout } from "../store/auth/authSlice";

type LoginData = {
  email: string;
  password: string;
};

export const useAuthStore = () => {
  const dispatch = useAppDispatch();

  const { user, status, errorMessage } = useAppSelector((state) => state.auth);

  const startLogin = async ({ email, password }: LoginData) => {
    try {
      await schoolMetricsApi.post("/auth/login", { email, password });

      // TODO set token in local storage or cookie

      dispatch(login({ userId: "1", email, role: "ADMIN", state: "active" }));
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
  };
};
