import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isSideBarOpen: boolean;
}

const initialState: UiState = {
  isSideBarOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    openSideBar: (state) => {
      state.isSideBarOpen = true;
    },

    closeSideBar: (state) => {
      state.isSideBarOpen = false;
    },
  },
});

export const { openSideBar, closeSideBar } = uiSlice.actions;

export default uiSlice.reducer;
