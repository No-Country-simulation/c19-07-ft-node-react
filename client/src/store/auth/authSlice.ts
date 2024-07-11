import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: "not-authenticated",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.status = "authenticated";
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },

    logout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload?.errorMessage;
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
