import React from "react";
import ReactDOM from "react-dom/client";

// Redux
import { Provider } from "react-redux";

// Material UI
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { SnackbarProvider } from "notistack";

import { store } from "./store/store";
import appTheme from "./themes/app-theme.ts";

import "./index.css";

import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
