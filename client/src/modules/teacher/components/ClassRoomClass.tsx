import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks";
import { useAuthStore } from "../../../hooks/useAuthStore";

interface Course {
  cursos_id: string;
  nombre: string;
}

const ClassRoomClass = () => {
  const api = useAxiosPrivate();
  const { user } = useAuthStore();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<number | string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      if (user && user.user_id) {
        try {
          const response = await api.get(
            `/professors/assigned_students/${user.Professors[0].professor_id}`
          );
          console.log("Response Data:", response.data);

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
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleStudentClick = (studentId: string) => {
    console.log(`Student ID clicked: ${studentId}`);
    navigate(`/teacher/class/student/report/${studentId}`); // Incluye el ID del estudiante en la URL
  };

  const handleEditClick = (studentId: string) => {
    setSelectedStudent(studentId);
    setOpen(true);
  };

  const handleSave = () => {
    // Lógica para guardar la nota actualizada
    setOpen(false);
  };

  return (
    <Container disableGutters>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ backgroundColor: "#004643", padding: "4vh" }}>
          <Grid
            container
            justifyContent="center"
            spacing={3}
            sx={{ marginX: { xs: "auto", sm: 0 } }}
          >
            {courses.map((course) => (
              <Grid key={course.cursos_id} item xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 6,
                      backgroundColor: "#abd1c6",
                    },
                  }}
                  onClick={() => handleCardClick(course.cursos_id)}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      {course.nombre}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ marginTop: "" }}>
          <Typography variant="h6" component="div">
            {selectedCourse
              ? `Students in ${selectedCourse.nombre}`
              : "Select a subject to see the students"}
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "1rem" }}>
            <Table aria-label="student table">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Student name</TableCell>
                  <TableCell>Education level</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Section</TableCell>
                  <TableCell>Average grades</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No hay estudiantes para mostrar.
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student, index) => (
                    <TableRow
                      key={student.student_id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        onClick={() => handleStudentClick(student.student_id)}
                        sx={{
                          "&:hover": {
                            boxShadow: 6,
                          },
                        }}
                      >
                        {student.user_id}
                      </TableCell>
                      <TableCell>nivel de educación</TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>
                        {student.averageGrade || "N/A"}
                        <IconButton
                          size="small"
                          onClick={() => handleEditClick(student.student_id)}
                          sx={{ marginLeft: "0.5rem" }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Grades</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="grade"
            label="Grade"
            type="number"
            fullWidth
            variant="standard"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ClassRoomClass;
