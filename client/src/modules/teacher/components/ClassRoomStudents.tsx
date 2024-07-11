import {
  Box,
  Container,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Slice from "./Slice";
import { useNavigate } from "react-router-dom";

const createData = (name, math, science, english, history) => {
  const avg = (math + science + english + history) / 4;
  return { name, math, science, english, history, avg };
};

const rows = [
  createData("Patricia Rodriguez", 8.5, 9.2, 8.8, 9),
  createData("Samuel Velez", 7.8, 8.5, 8.2, 8.9),
  createData("Sam Luis", 9.5, 9.4, 9.0, 9.3),
  createData("Lucy Arandu", 7.0, 7.5, 8.0, 7.2),
  createData("Lorena Bedoya", 8.8, 9.1, 8.5, 8.7),
];

const ClassRoomStudents = () => {
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
              <Box
                sx={{
                  position: "relative",
                  marginBottom: "4vh", // Ajustar la posición del botón de flecha hacia atrás
                }}
              >
                <IconButton
                  onClick={handleBackButtonClick}
                  sx={{
                    color: "black",
                    backgroundColor: "#f9bc60",
                    height: "5vh",
                    width: "50px",
                    borderRadius: "0px",
                  }}
                >
                  <ArrowBack />
                </IconButton>
              </Box>

              {/* Contenedor de la tabla */}
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, backgroundColor: "#f9bc60" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "black", fontWeight: 'bold' }}>Student</TableCell>
                      <TableCell align="right" sx={{ color: "black" }}>
                        Math
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black", fontWeight: 'bold' }}>
                        Science
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black", fontWeight: 'bold' }}>
                        English
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black", fontWeight: 'bold' }}>
                        History
                      </TableCell>
                      <TableCell align="right" sx={{ color: "black", fontWeight: 'bold' }}>
                        Average
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black", fontWeight: 'bold' }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {row.math}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {row.science}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {row.english}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {row.history}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {row.avg.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassRoomStudents;
