import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { NavBar, SideBar } from "../components";

export default function HomePage() {
  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      sx={{ display: "flex", height: "100vh" }}
    >
      <SideBar />

      <Box sx={{ width: "100%", height: "100%" }}>
        <NavBar />

        <Box
          component="main"
          overflow="auto"
          sx={{
            height: "calc(100% - 64px)",
            padding: { xs: 2, sm: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
