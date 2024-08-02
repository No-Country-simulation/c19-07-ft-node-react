import { Logout, Menu } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";

import { useAuthStore, useUiStore } from "../../hooks";

import { useAlert } from "../../hooks/useAlert";
import { NotificationComponent } from "./notificationSnackBar";

export const NavBar = () => {
  const { startLogout } = useAuthStore();
  const { handleOpenSideBar } = useUiStore();

  const { alert } = useAlert();

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#abd1c6",
        }}
      >
        <Box display="flex" alignItems="center" gap={0.5}>
          <Tooltip title="Menu" sx={{ display: { lg: "none" } }}>
            <IconButton onClick={handleOpenSideBar}>
              <Menu />
            </IconButton>
          </Tooltip>

          <Typography color="primary" variant="h6" fontWeight="bold">
            School Name
          </Typography>
        </Box>

        <Box>
          <NotificationComponent />

          <Tooltip title="Logout">
            <IconButton color="error" onClick={startLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
