// import { useState, useEffect } from "react";
// import {
//   Box,
//   Container,
//   Grid,
//   IconButton,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Checkbox,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { useAxiosPrivate } from "../../../hooks";
// import { Student } from "../../../interfaces";

// type AlignType = "left" | "right" | "center";

// const headers: { name: string; align: AlignType }[] = [
//   { name: "Selection", align: "left" },
//   { name: "Student", align: "left" },
//   { name: "Math", align: "right" },
//   { name: "Science", align: "right" },
//   { name: "English", align: "right" },
//   { name: "History", align: "right" },
//   { name: "Average", align: "right" },
//   { name: "Report", align: "right" },
// ];

// const ClassRoomStudents = () => {
//   const navigate = useNavigate();
//   const api = useAxiosPrivate();
//   const [selectedRows, setSelectedRows] = useState<string[]>([]);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [students, setStudents] = useState<Student[]>([]);

//   const fetchStudents = async () => {
//     try {
//       const response = await api.get<Student[]>(`/students`);
//       setStudents(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [api]);

//   const handleBackButtonClick = () => {
//     navigate(-1);
//   };

//   const handleEditButtonClick = () => {
//     if (selectedRows.length === 1) {
//       navigate(`/classNewStudents/`);
//     } else {
//       setOpenSnackbar(true);
//     }
//   };

//   const handleReportButtonClick = () => {
//     navigate(`/teacher/class/student/report`);
//   };

//   const handleCheckboxChange = (id: string) => {
//     if (selectedRows.includes(id)) {
//       setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
//     } else {
//       setSelectedRows([...selectedRows, id]);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <Container disableGutters>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Grid container spacing={3}>
//             <Grid
//               item
//               xs={12}
//               sx={{
//                 backgroundColor: "#004643",
//                 padding: "4vh",
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: "4vh",
//                 }}
//               >
//                 <IconButton
//                   onClick={handleBackButtonClick}
//                   sx={{
//                     color: "black",
//                     fontWeight: "bold",
//                     height: "5vh",
//                     width: "50px",
//                     borderRadius: "0px",
//                     "&:hover": {
//                       backgroundColor: "#f9bc60",
//                     },
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//                 <Box>
//                   <Button
//                     variant="contained"
//                     onClick={handleEditButtonClick}
//                     sx={{
//                       color: "black",
//                       fontWeight: "bold",
//                       marginRight: "10px",
//                       "&:hover": {
//                         backgroundColor: "#e16162",
//                       },
//                     }}
//                   >
//                     Editar
//                   </Button>
//                 </Box>
//               </Box>
//               <TableContainer component={Paper}>
//                 <Table
//                   sx={{ minWidth: 650, backgroundColor: "#f9bc60" }}
//                   aria-label="simple table"
//                 >
//                   <TableHead>
//                     <TableRow>
//                       {headers.map((header) => (
//                         <TableCell
//                           key={header.name}
//                           align={header.align}
//                           sx={{ color: "black", fontWeight: "bold" }}
//                         >
//                           {header.name}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {students.map((student) => (
//                       <TableRow key={student.student_id}>
//                         <TableCell>
//                           <Checkbox
//                             checked={selectedRows.includes(student.student_id)}
//                             onChange={() =>
//                               handleCheckboxChange(student.student_id)
//                             }
//                           />
//                         </TableCell>
//                         <TableCell
//                           component="th"
//                           scope="row"
//                           sx={{ color: "black", fontWeight: "bold" }}
//                         >
//                           {student.user_id}
//                         </TableCell>
//                         <TableCell align="right" sx={{ color: "black" }}>
//                           {/* Aquí puedes poner las notas de Math si las tienes */}
//                           8.2
//                         </TableCell>
//                         <TableCell align="right" sx={{ color: "black" }}>
//                           {/* Aquí puedes poner las notas de Science si las tienes */}
//                           5.2
//                         </TableCell>
//                         <TableCell align="right" sx={{ color: "black" }}>
//                           {/* Aquí puedes poner las notas de English si las tienes */}
//                           9.8
//                         </TableCell>
//                         <TableCell align="right" sx={{ color: "black" }}>
//                           {/* Aquí puedes poner las notas de History si las tienes */}
//                           9.0
//                         </TableCell>
//                         <TableCell align="right" sx={{ color: "black" }}>
//                           {/* Aquí puedes calcular el promedio si tienes las notas */}
//                           promedio
//                         </TableCell>
//                         <TableCell align="right">
//                           <Button
//                             variant="contained"
//                             onClick={handleReportButtonClick}
//                             sx={{
//                               backgroundColor: "#f9bc60",
//                               color: "white",
//                               "&:hover": {
//                                 backgroundColor: "#e16162",
//                               },
//                             }}
//                           >
//                             Informe
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity="warning"
//           sx={{ width: "100%" }}
//         >
//           {selectedRows.length === 0
//             ? "Debe seleccionar primero un estudiante antes de realizar esta acción."
//             : "Solo debe haber un estudiante seleccionado para realizar esta acción."}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ClassRoomStudents;

import { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Subject = "Math" | "Science" | "English" | "History";

interface GradeDetail {
  name: string;
  grade: number;
}

interface Student {
  student_id: string;
  user_id: string;
  grades: {
    [key in Subject]: GradeDetail[];
  };
}

const headers: { name: string; align: "left" | "right" | "center" }[] = [
  { name: "No.", align: "left" },
  { name: "Student", align: "left" },
  { name: "Math", align: "right" },
  { name: "Science", align: "right" },
  { name: "English", align: "right" },
  { name: "History", align: "right" },
  { name: "Average", align: "right" },
  { name: "Report", align: "right" },
];

const initialStudents: Student[] = [
  {
    student_id: "1",
    user_id: "student1",
    grades: {
      Math: [
        { name: "Taller 1", grade: 8 },
        { name: "Taller 2", grade: 9 },
      ],
      Science: [
        { name: "Taller 1", grade: 7 },
        { name: "Taller 2", grade: 6 },
      ],
      English: [
        { name: "Taller 1", grade: 9 },
        { name: "Taller 2", grade: 10 },
      ],
      History: [
        { name: "Taller 1", grade: 8 },
        { name: "Taller 2", grade: 7 },
      ],
    },
  },
  {
    student_id: "2",
    user_id: "student2",
    grades: {
      Math: [
        { name: "Taller 1", grade: 7 },
        { name: "Taller 2", grade: 8 },
      ],
      Science: [
        { name: "Taller 1", grade: 6 },
        { name: "Taller 2", grade: 7 },
      ],
      English: [
        { name: "Taller 1", grade: 8 },
        { name: "Taller 2", grade: 9 },
      ],
      History: [
        { name: "Taller 1", grade: 7 },
        { name: "Taller 2", grade: 6 },
      ],
    },
  },
];

const calculateAverage = (grades: GradeDetail[]) => {
  const total = grades.reduce((sum, gradeDetail) => sum + gradeDetail.grade, 0);
  return (total / grades.length).toFixed(2);
};

const ClassRoomStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentGrades, setCurrentGrades] = useState<GradeDetail[]>([]);
  const [currentStudentId, setCurrentStudentId] = useState<string>("");
  const [currentSubject, setCurrentSubject] = useState<Subject>("Math");


  const handleReportButtonClick = () => {
    navigate(`/teacher/class/student/report`);
  };

  const handleGradeClick = (studentId: string, subject: Subject) => {
    const student = students.find((s) => s.student_id === studentId);
    if (student) {
      setCurrentGrades(student.grades[subject]);
      setCurrentStudentId(studentId);
      setCurrentSubject(subject);
      setDialogOpen(true);
    }
  };

  const handleGradeChange = (
    index: number,
    field: "name" | "grade",
    value: string | number
  ) => {
    const newGrades = [...currentGrades];
    newGrades[index] = { ...newGrades[index], [field]: value };
    setCurrentGrades(newGrades);
  };

  const handleAddGrade = () => {
    setCurrentGrades([...currentGrades, { name: "", grade: 0 }]);
  };

  const handleRemoveGrade = (index: number) => {
    setCurrentGrades(currentGrades.filter((_, i) => i !== index));
  };

  const handleSaveGrades = () => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.student_id === currentStudentId) {
          return {
            ...student,
            grades: {
              ...student.grades,
              [currentSubject]: currentGrades,
            },
          };
        }
        return student;
      })
    );
    setDialogOpen(false);
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
                    {students.map((student, index) => (
                      <TableRow key={student.student_id}>
                        <TableCell
                          align="left"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black", fontWeight: "bold" }}
                        >
                          {student.user_id}
                        </TableCell>
                        {(
                          ["Math", "Science", "English", "History"] as Subject[]
                        ).map((subject) => (
                          <TableCell
                            key={subject}
                            align="right"
                            sx={{ color: "black", cursor: "pointer" }}
                            onClick={() =>
                              handleGradeClick(student.student_id, subject)
                            }
                          >
                            {calculateAverage(student.grades[subject])}
                          </TableCell>
                        ))}
                        <TableCell align="right" sx={{ color: "black" }}>
                          {calculateAverage(
                            ([] as GradeDetail[]).concat(
                              ...Object.values(student.grades)
                            )
                          )}
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
                            Report
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit or Add Notes</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              maxHeight: 300,
              overflowY: "auto",
              marginBottom: "16px",
            }}
          >
            {currentGrades.map((gradeDetail, index) => (
              <Box key={index} display="flex" alignItems="center" mb={2}>
                <TextField
                  label="Workshop Name"
                  value={gradeDetail.name}
                  onChange={(e) =>
                    handleGradeChange(index, "name", e.target.value)
                  }
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  type="number"
                  label="Note"
                  value={gradeDetail.grade}
                  onChange={(e) =>
                    handleGradeChange(index, "grade", Number(e.target.value))
                  }
                  sx={{ marginRight: 2 }}
                />
                <IconButton onClick={() => handleRemoveGrade(index)}>
                  <Remove />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddGrade}
              sx={{ marginBottom: "16px" }}
            >
              Add Workshop
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveGrades}>Keep</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassRoomStudents;