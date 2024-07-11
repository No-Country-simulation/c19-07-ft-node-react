//Primer vista maestro
import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Slice from "./Slice";

const ClassRoom = () => {
  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        {/* Contenedor principal */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Columna izquierda (25%) */}
            <Grid item xs={3}>
              <Slice />
            </Grid>

            {/* Columna derecha (75%) */}
            <Grid
              item
              xs={9}
              sx={{
                backgroundColor: "#004643",
                padding: "4vh",
              }}
            >
              {/* Contenedor Classs y chat */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Link to="/class" style={{ textDecoration: "none" }}>
                    <Box
                      component="div"
                      sx={{
                        backgroundColor: "#f9bc60",
                        borderRadius: "30px",
                        height: {
                          xs: "20vh",
                          sm: "40vh",
                          md: "60vh",
                          lg: "80vh",
                        },
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        component="div"
                        sx={{
                          textAlign: "center",
                          fontSize: "8vh",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Class
                      </Box>
                    </Box>
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: "#f9bc60",
                      borderRadius: "20px",
                      height: {
                        xs: "20vh",
                        sm: "40vh",
                        md: "60vh",
                        lg: "80vh",
                      },
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        textAlign: "center",
                        fontSize: "8vh",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Chat
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassRoom;
//lista
