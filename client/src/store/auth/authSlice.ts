import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../interfaces";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: User | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: "checking",
  user: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = null;
    },

    logout: (state, action: PayloadAction<string | null>) => {
      state.status = "not-authenticated";
      state.user = null;
      state.errorMessage = action.payload;
    },

    checkingCredentials: (state) => {
      state.status = "checking";
      state.user = null;
      state.errorMessage = null;
    },

    clearErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { login, logout, checkingCredentials, clearErrorMessage } =
  authSlice.actions;

export default authSlice.reducer;
