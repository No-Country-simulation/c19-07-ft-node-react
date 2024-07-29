import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks";
import { useAuthStore } from "../../../hooks/useAuthStore";
import CourseCard from "./CourseCard";
import StudentTable from "./StudentTable";
import GradeDialog from "./EditGradeDialog";
import SuccessSnackbar from "./SuccessSnackbar";
import StudentFilter from "./StudentFilter";

// Definición de interfaces
interface Course {
  cursos_id: string;
  nombre: string;
}

interface Student {
  student_id: string;
  name: string;
  educationalLevel: string;
  grade: string;
  section: string;
  mark?: number;
}

const ClassRoomClass = () => {
  const api = useAxiosPrivate();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<number | string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] =
    useState<string>("Primer Trimestre");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (user && user.user_id) {
        try {
          const response = await api.get(
            `/professors/assigned_students/${user.Professors[0].professor_id}`
          );
          if (Array.isArray(response.data.data)) {
            const assignedCourses = response.data.data.map(
              (item: any) => item.course
            );
            setCourses(assignedCourses);
          } else {
            console.error("Unexpected response format:", response.data);
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      }
    };

    fetchCourses();
  }, [user]);

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, students]);

  const handleCardClick = async (courseId: string) => {
    try {
      const response = await api.get(
        `/professors/assigned_students/${user.Professors[0].professor_id}`
      );
      const courseData = response.data.data.find(
        (item: any) => item.course.cursos_id === courseId
      );
      if (courseData) {
        setSelectedCourse(courseData.course);
        setStudents(courseData.students);
        setSearchTerm("");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleStudentClick = (studentId: string) => {
    navigate(`/teacher/class/student/report/${studentId}`);
  };

  const handleEditClick = (studentId: string, currentGrade?: number) => {
    setSelectedStudent(studentId);
    setGrade(currentGrade || "");
    setOpen(true);
  };

  const handleSave = async (newGrade: number) => {
    if (selectedStudent !== null) {
      try {
        if (newGrade < 0 || newGrade > 100) {
          alert("La nota debe estar entre 0 y 100");
          return;
        }

        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.student_id === selectedStudent
              ? { ...student, mark: newGrade }
              : student
          )
        );
        setOpen(false);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error updating grade:", error);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePeriodChange = (event: SelectChangeEvent<string>) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <Container disableGutters>
      <Box sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          sx={{
            color: "#004643",
            fontWeight: "bold",
            fontSize: "3rem",
            textShadow: "2px 2px 4px rgba(2, 2, 2, 0.849)",
          }}
        >
          Gestión de Notas por Materia
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ backgroundColor: "#004643", padding: "4vh" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#fff", marginBottom: 2 }}
          >
            Selecciona una materia:
          </Typography>
          <Grid container justifyContent="center" spacing={3}>
            {courses.map((course) => (
              <Grid key={course.cursos_id} item xs={12} sm={6} md={4} lg={3}>
                <CourseCard course={course} onClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {selectedCourse && (
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
              <Typography variant="h6" component="div" gutterBottom>
                Estudiantes en{" "}
                <Box
                  component="span"
                  sx={{
                    background: "linear-gradient(to right, #f84109, #881078)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: "bold",
                    textDecoration: "line-through",
                  }}
                >
                  {selectedCourse.nombre}
                </Box>
              </Typography>
              <Box sx={{ marginBottom: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Periodo</InputLabel>
                  <Select
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    label="Periodo"
                  >
                    <MenuItem value="Primer Trimestre">
                      Periodo 1: Febrero - Abril
                    </MenuItem>
                    <MenuItem value="Segundo Trimestre">
                      Periodo 2: Mayo - Julio
                    </MenuItem>
                    <MenuItem value="Tercer Trimestre">
                      Periodo 3: Agosto - Noviembre
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <StudentFilter
                searchTerm={searchTerm}
                onSearchTermChange={(e) => setSearchTerm(e.target.value)}
              />
              <Divider sx={{ marginY: 2 }} />
              <StudentTable
                students={filteredStudents}
                onEditClick={handleEditClick}
                onStudentClick={handleStudentClick}
              />
            </Paper>
          </Grid>
        )}
      </Grid>

      <GradeDialog
        open={open}
        grade={grade}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        onGradeChange={(e) => setGrade(e.target.value)}
      />

      <SuccessSnackbar open={snackbarOpen} onClose={handleSnackbarClose} />
    </Container>
  );
};

export default ClassRoomClass;



// import { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   Typography,
//   Paper,
//   Box,
//   Divider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   SelectChangeEvent,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useAxiosPrivate } from "../../../hooks";
// import { useAuthStore } from "../../../hooks/useAuthStore";
// import CourseCard from "./CourseCard";
// import StudentTable from "./StudentTable";
// import GradeDialog from "./EditGradeDialog";
// import SuccessSnackbar from "./SuccessSnackbar";
// import StudentFilter from "./StudentFilter";

// // Definición de interfaces
// interface Course {
//   cursos_id: string;
//   nombre: string;
// }

// interface Student {
//   student_id: string;
//   name: string;
//   educationalLevel: string;
//   grade: string;
//   section: string;
//   mark?: number;
// }

// const ClassRoomClass = () => {
//   const api = useAxiosPrivate();
//   const { user } = useAuthStore();
//   const [courses, setCourses] = useState<Course[]>([]);
//   const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
//   const [students, setStudents] = useState<Student[]>([]);
//   const [allStudents, setAllStudents] = useState<Student[]>([]);
//   const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
//   const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
//   const [open, setOpen] = useState(false);
//   const [grade, setGrade] = useState<number | string>("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedPeriod, setSelectedPeriod] =
//     useState<string>("Primer Trimestre");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCoursesAndStudents = async () => {
//       if (user && user.user_id) {
//         try {
//           // Fetch courses and students assigned to the professor
//           const response = await api.get(
//             `/professors/assigned_students/${user.Professors[0].professor_id}`
//           );
//           if (Array.isArray(response.data.data)) {
//             const assignedCourses = response.data.data.map(
//               (item: any) => item.course
//             );
//             setCourses(assignedCourses);

//             const allAssignedStudents = response.data.data.flatMap(
//               (item: any) => item.students
//             );
//             setAllStudents(allAssignedStudents);
//             setStudents(allAssignedStudents);
//             setFilteredStudents(allAssignedStudents);
//           } else {
//             console.error("Unexpected response format:", response.data);
//           }
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       }
//     };

//     fetchCoursesAndStudents();
//   }, [user]);

//   useEffect(() => {
//     setFilteredStudents(
//       students.filter((student) =>
//         student.name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, students]);

//   const handleCardClick = async (courseId: string) => {
//     try {
//       if (courseId === 'all') {
//         setSelectedCourse(null);
//         setStudents(allStudents);
//       } else {
//         const response = await api.get(
//           `/professors/assigned_students/${user.Professors[0].professor_id}`
//         );
//         const courseData = response.data.data.find(
//           (item: any) => item.course.cursos_id === courseId
//         );
//         if (courseData) {
//           setSelectedCourse(courseData.course);
//           setStudents(courseData.students);
//           setFilteredStudents(courseData.students);
//           setSearchTerm("");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//     }
//   };

//   const handleStudentClick = (studentId: string) => {
//     navigate(`/teacher/class/student/report/${studentId}`);
//   };

//   const handleEditClick = (studentId: string, currentGrade?: number) => {
//     setSelectedStudent(studentId);
//     setGrade(currentGrade || "");
//     setOpen(true);
//   };

//   const handleSave = async (newGrade: number) => {
//     if (selectedStudent !== null) {
//       try {
//         if (newGrade < 0 || newGrade > 100) {
//           alert("La nota debe estar entre 0 y 100");
//           return;
//         }

//         setStudents((prevStudents) =>
//           prevStudents.map((student) =>
//             student.student_id === selectedStudent
//               ? { ...student, mark: newGrade }
//               : student
//           )
//         );
//         setOpen(false);
//         setSnackbarOpen(true);
//       } catch (error) {
//         console.error("Error updating grade:", error);
//       }
//     }
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handlePeriodChange = (event: SelectChangeEvent<string>) => {
//     setSelectedPeriod(event.target.value);
//   };

//   return (
//     <Container disableGutters>
//       <Box sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
//         <Typography
//           variant="h4"
//           component="div"
//           gutterBottom
//           sx={{
//             color: "#004643",
//             fontWeight: "bold",
//             fontSize: "3rem",
//             textShadow: "2px 2px 4px rgba(2, 2, 2, 0.849)",
//           }}
//         >
//           Gestión de Notas por Materia
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} sx={{ backgroundColor: "#004643", padding: "4vh" }}>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ color: "#fff", marginBottom: 2 }}
//           >
//             Selecciona una materia:
//           </Typography>
//           <Grid container justifyContent="center" spacing={3}>
//             <Grid key="all" item xs={12} sm={6} md={4} lg={3}>
//               <CourseCard
//                 course={{ cursos_id: "all", nombre: "Todos los Estudiantes" }}
//                 onClick={handleCardClick}
//               />
//             </Grid>
//             {courses.map((course) => (
//               <Grid key={course.cursos_id} item xs={12} sm={6} md={4} lg={3}>
//                 <CourseCard course={course} onClick={handleCardClick} />
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         {selectedCourse && (
//           <Grid item xs={12}>
//             <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3 }}>
//               <Typography variant="h6" component="div" gutterBottom>
//                 Estudiantes en{" "}
//                 <Box
//                   component="span"
//                   sx={{
//                     background: "linear-gradient(to right, #f84109, #881078)",
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     fontWeight: "bold",
//                     textDecoration: "line-through",
//                   }}
//                 >
//                   {selectedCourse.nombre}
//                 </Box>
//               </Typography>
//               <Box sx={{ marginBottom: 2 }}>
//                 <FormControl fullWidth>
//                   <InputLabel>Periodo</InputLabel>
//                   <Select
//                     value={selectedPeriod}
//                     onChange={handlePeriodChange}
//                     label="Periodo"
//                   >
//                     <MenuItem value="Primer Trimestre">
//                       Periodo 1: Febrero - Abril
//                     </MenuItem>
//                     <MenuItem value="Segundo Trimestre">
//                       Periodo 2: Mayo - Julio
//                     </MenuItem>
//                     <MenuItem value="Tercer Trimestre">
//                       Periodo 3: Agosto - Noviembre
//                     </MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <StudentFilter
//                 searchTerm={searchTerm}
//                 onSearchTermChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <StudentTable
//                 students={filteredStudents}
//                 onEditClick={handleEditClick}
//                 onStudentClick={handleStudentClick}
//               />
//             </Paper>
//           </Grid>
//         )}
//       </Grid>

//       <GradeDialog
//         open={open}
//         grade={grade}
//         onClose={() => setOpen(false)}
//         onSave={handleSave}
//         onGradeChange={(e) => setGrade(e.target.value)}
//       />

//       <SuccessSnackbar open={snackbarOpen} onClose={handleSnackbarClose} />
//     </Container>
//   );
// };

// export default ClassRoomClass;
