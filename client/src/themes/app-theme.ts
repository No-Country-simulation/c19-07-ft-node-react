import { createTheme } from "@mui/material/styles";

const appTheme = createTheme({
  palette: {
    primary: { main: "#f9bc60" },
    secondary: { main: "#abd1c6" },
    error: { main: "#e16162" },
    background: { default: "#004643", paper: "#004643" },
    text: { primary: "#fffffe" },
  },
});

export default appTheme;
