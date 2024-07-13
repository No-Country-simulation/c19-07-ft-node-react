import { Logout, Menu, Notifications } from "@mui/icons-material";
import {
  Box,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";

import { useUiStore } from "../../hooks";

export const NavBar = () => {
  const { handleOpenSideBar } = useUiStore();

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
          <Tooltip title="Notifications">
            <IconButton aria-label="Notifications">
              <Notifications />
            </IconButton>
          </Tooltip>

          <Tooltip title="Logout">
            <IconButton color="error">
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
