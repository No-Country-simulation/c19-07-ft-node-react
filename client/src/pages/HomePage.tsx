import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import { NavBar, SideBar } from "../components";
import { useAxiosPrivate } from "../hooks";
import { useEffect } from "react";

export function HomePage() {
  const api = useAxiosPrivate();

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await api.get("/users", {
          signal: controller.signal,
        });

        console.log(response.data);

        // isMounted && setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, []);

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
            padding: 3,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
