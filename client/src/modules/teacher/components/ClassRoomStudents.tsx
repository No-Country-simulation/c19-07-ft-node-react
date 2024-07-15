import { useState } from "react";
import {Box,Container,Grid,IconButton,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,
  Paper,Checkbox,Snackbar,Alert,Dialog,DialogTitle,DialogContent,DialogActions,Typography} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const createData = (id, name, math, science, english, history) => {
  const avg = (math + science + english + history) / 4;
  return { id, name, math, science, english, history, avg };
};

const rows = [
  createData(1, "Patricia Rodriguez", 8.5, 9.2, 8.8, 9),
  createData(2, "Samuel Velez", 7.8, 8.5, 8.2, 8.9),
  createData(3, "Sam Luis", 9.5, 9.4, 9.0, 9.3),
  createData(4, "Lucy Arandu", 7.0, 7.5, 8.0, 7.2),
  createData(5, "Lorena Bedoya", 8.8, 9.1, 8.5, 8.7),
];

const ClassRoomStudents = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handleNewStudentClick = () => {
    navigate(`/classNewStudents/`);
  };

  const handleEditButtonClick = () => {
    if (selectedRows.length === 1) {
      navigate(`/classNewStudents/`);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleDeleteButtonClick = () => {
    if (selectedRows.length === 1) {
      setOpenDeleteDialog(true);
    } else {
      setOpenSnackbar(true);
    }
  };

  const handleReportButtonClick = () => {
    navigate(`/parent/`);
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log(`Eliminar estudiante con ID ${selectedRows[0]}`);
    setOpenDeleteDialog(false);
  };

  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "4vh",
                }}
              >
                <IconButton
                  onClick={handleBackButtonClick}
                  sx={{
                    color: "black",
                    fontWeight: "bold",
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
                <Box>
                  <Button
                    variant="contained"
                    onClick={handleNewStudentClick}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      marginRight: "10px",
                      "&:hover": {
                        backgroundColor: "#e16162",
                      },
                    }}
                  >
                    Nuevo
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleEditButtonClick}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      marginRight: "10px",
                      "&:hover": {
                        backgroundColor: "#e16162",
                      },
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleDeleteButtonClick}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#e16162",
                      },
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Box>

              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 650, backgroundColor: "#f9bc60" }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                        Selection
                      </TableCell>
                      <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                        Student
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        Math
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        Science
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        English
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        History
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        Average
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ color: "black", fontWeight: "bold" }}
                      >
                        Report
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(row.id)}
                            onChange={() => handleCheckboxChange(row.id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black", fontWeight: "bold" }}
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
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={() => handleReportButtonClick(row.id)}
                            sx={{
                              backgroundColor: "#f9bc60",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "#e16162",
                              },
                            }}
                          >
                            Informe
                          </Button>
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

      {/* Snackbar para mostrar mensaje de selección */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: "100%" }}
        >
          {selectedRows.length === 0
            ? "Debe seleccionar primero un estudiante antes de realizar esta acción."
            : "Solo debe haber un estudiante seleccionado para realizar esta acción."}
        </Alert>
      </Snackbar>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"¿Está seguro de eliminar este estudiante?"}</DialogTitle>
        <DialogContent>
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body1">
              Esta acción no se puede deshacer.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassRoomStudents;
