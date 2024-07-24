import { useEffect } from "react";
import { Box, Container, Grid} from "@mui/material";
import { useLocation, Link } from "react-router-dom";

interface Student {
  grade: string;
  section: string;
}

const ClassRoomChosen = () => {
  const location = useLocation();
  const students = location.state?.students as Student[] || [];

  useEffect(() => {
    console.log('Estudiantes:', students);
  }, [students]);


  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sx={{ backgroundColor: "#004643", padding: "4vh" }}
            >
              <Box sx={{ position: "relative" }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Link
                      to="/teacher/class/students"
                      state={{ students: students }}
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
                    <Link
                      to="/teacher/calendar"
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
                        Schedule
                      </Box>
                    </Box>
                    </Link>
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