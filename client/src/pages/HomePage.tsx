import { Drawer, Button, Box, AppBar } from "@mui/material";
import { Outlet } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "row", heigth:"100%"}}>
        <Drawer
          sx={{
            flexShrink: 0,
            width: {
              xs: 150,
              sm: "25%",
              md: 240,
              lg: 240,
            },
            "& .MuiDrawer-paper": {
              width: {
                xs: 150,
                sm: "25%",
                md: 240,
                lg: 240,
              },
              backgroundColor: "#abd1c6",
              alignItems: "center",
              gap:4
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              backgroundColor: "#D9D9D9",
              width: "13vw",
              height: "13vw",
              borderRadius: "50%",
              border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              marginTop: 2,
            }}
          >
            <img
              src="IMG-ROUTE" //?PONER RUTA DE IMAGEN SEGUN LA VERIFICACION DE QUIEN ENTRO
              alt="IMG-TEACHER-OR-STUDIENT" //?PONER UNA U OTRA DESCRIPCION SEGUN LA VERIFICACION DE QUIEN ENTRO
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "#D9D9D9",
              color: "black",
              width: "100%",
              "&:hover": {
                backgroundColor: "#004643",
                color: "#abd1c6",
              },
            }}
          >
            <p>Announcement</p>
          </Button>
          <Button
            sx={{
              backgroundColor: "#D9D9D9",
              color: "black",
              width: "100%",
              "&:hover": {
                backgroundColor: "#004643",
                color: "#abd1c6",
              },
            }}
          >
            <p>Classmates</p>
          </Button>
          <Button
            sx={{
              backgroundColor: "#D9D9D9",
              color: "black",
              width: "100%",
              "&:hover": {
                backgroundColor: "#004643",
                color: "#abd1c6",
              },
            }}
          >
            <p>Chat</p>
          </Button>
        </Drawer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "purple",
            width: "100%",
          }}
        >
          <AppBar
            position="static"
            sx={{
              flexGrow: 1,
              padding: "20px",
              marginLeft: 0,
              backgroundColor: "#abd1c6",
            }}
          >
            NAVBAR
          </AppBar>
          <Box sx={{
            flexGrow: 1,
            minHeight: 0, 
            backgroundColor: "#004643",
            padding: 3,
            }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
}