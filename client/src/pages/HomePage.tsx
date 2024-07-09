import { Drawer, Button, Box, AppBar } from "@mui/material";
import { Outlet } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <Box sx={{ display: "flex", overflowX: "hidden" }}>
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
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#D9D9D9",
                width: "15vw",
                height: "15vw",
                borderRadius: "50%",
                border: "2px solid black",
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

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                marginTop: 5,
                width: "100%",
                gap: 5,
              }}
            >
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
            </Box>
          </Box>
        </Drawer>

        <AppBar
          position="static"
          sx={{
            flexGrow: 1,
            padding: "10px",
            marginLeft: 0,
            backgroundColor: "#abd1c6",
          }}
        >
          <Box
            sx={{
              width: "81%",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <p>School Name</p>
            <p>Name of teacher/student</p> {/*ESTO TIENE QUE VARIAR SEGUN LA VERIFICACION */}
          </Box>
        </AppBar>
      </Box>

      <div>
        <Outlet />
      </div>
    </>
  );
}
