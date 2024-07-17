import { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const URL_BASE = "http://localhost:3001/api";

type AlignType = 'left' | 'right' | 'center';

const headers: { name: string; align: AlignType }[] = [
    { name: "Selection", align: "left" },
    { name: "Student", align: "left" },
    { name: "Math", align: "right" },
    { name: "Science", align: "right" },
    { name: "English", align: "right" },
    { name: "History", align: "right" },
    { name: "Average", align: "right" },
    { name: "Report", align: "right" },
   ];

const ClassRoomStudents = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [students, setStudents] = useState<any[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${URL_BASE}/students`);
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleCheckboxChange = (id: string) => {
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
                      {headers.map((header) => (
                        <TableCell
                          key={header.name}
                          align={header.align}
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {header.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.student_id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRows.includes(student.student_id)}
                            onChange={() => handleCheckboxChange(student.student_id)}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {student.user_id}
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {/* Aquí puedes poner las notas de Math si las tienes */}
                          N/A
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {/* Aquí puedes poner las notas de Science si las tienes */}
                          N/A
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {/* Aquí puedes poner las notas de English si las tienes */}
                          N/A
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {/* Aquí puedes poner las notas de History si las tienes */}
                          N/A
                        </TableCell>
                        <TableCell align="right" sx={{ color: "black" }}>
                          {/* Aquí puedes calcular el promedio si tienes las notas */}
                          N/A
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            onClick={handleReportButtonClick}
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
