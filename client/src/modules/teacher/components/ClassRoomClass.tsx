//Segunda vista maestros-clases
import { Box, Container, Grid } from "@mui/material";
import Slice from "./Slice";

const boxes = [
  { id: 1, label: "1ro" },
  { id: 2, label: "2A" },
  { id: 3, label: "5to" },
  { id: 4, label: "7mo" },
  { id: 5, label: "8vo" },
  { id: 6, label: "9no" },
];

const ClassRoomClass = () => {
  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Slice />
        </Grid>

        {/* Contenedor principal */}
        <Grid item xs={9} sx={{ backgroundColor: "#004643", padding: "4vh" }}>
          <Grid
            container
            justifyContent="center"
            spacing={3}
            sx={{
              marginX: { xs: "auto", sm: 0 },
            }}
          >
            {boxes.map((box) => (
              <Grid key={box.id} item xs={12} sm={6} md={4} lg={3}>
                <Box
                  component="div"
                  sx={{
                    backgroundColor: "#f9bc60",
                    height: { xs: "8vh", sm: "8vh", md: "10vh", lg: "20vh" },
                    width: "20vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontSize: "30px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    {box.label}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassRoomClass;
//lista