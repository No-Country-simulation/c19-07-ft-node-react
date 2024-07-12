//tercera vista maestros-clases-clase elegida
import { Box, Container, Grid, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const ClassRoomChosen = () => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        {/* Contenedor principal */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* Columna derecha (75%) */}
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "#004643",
                padding: "4vh",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={handleBackButtonClick}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    top: "-15px",
                    //backgroundColor: "#f9bc60",
                    height: "5vh",
                    width: "50px",
                    borderRadius: "0px",
                    "&:hover": {
                      backgroundColor: "#f9bc60",
                    },
                  }}
                >
                  <ArrowBack />
                </IconButton>

                {/* Contenedor Students y Schedule */}
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link
                      to="/classStudents"
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        component="div"
                        sx={{
                          backgroundColor: "#f9bc60",
                          borderRadius: "20px",
                          "&:hover": {
                            backgroundColor: "#e16162",
                          },
                          height: {
                            xs: "15vh",
                            sm: "30vh",
                            md: "40vh",
                            lg: "40vh",
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
                            fontSize: "50px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        >
                          Students
                        </Box>
                      </Box>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Box
                      component="div"
                      sx={{
                        backgroundColor: "#f9bc60",
                        borderRadius: "20px",
                        "&:hover": {
                          backgroundColor: "#e16162",
                        },
                        height: {
                          xs: "15vh",
                          sm: "30vh",
                          md: "40vh",
                          lg: "40vh",
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
                          fontSize: "50px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        Schedule
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassRoomChosen;
//lista
