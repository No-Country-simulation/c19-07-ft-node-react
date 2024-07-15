import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../interfaces";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: User | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: "authenticated",
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
    },
  },
});

export const { login, logout, checkingCredentials } = authSlice.actions;

// ? Other code such as selectors can use the imported `RootState` type
// export const status = (state: RootState) => state.auth.status;

export default authSlice.reducer;
