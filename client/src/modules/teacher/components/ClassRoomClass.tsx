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
  const [activeFilter, setActiveFilter] = useState("all");
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
    const filtered = students
      .filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((student) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "below50")
          return student.mark !== undefined && student.mark < 50;
        if (activeFilter === "between51and80")
          return (
            student.mark !== undefined &&
            student.mark >= 50 &&
            student.mark <= 80
          );
        if (activeFilter === "above80")
          return student.mark !== undefined && student.mark > 80;
        return true;
      });

    setFilteredStudents(filtered);
  }, [searchTerm, students, activeFilter]);

  const handleCardClick = async (courseId: string) => {
    console.log('Curso clickeado con ID:', courseId);
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
        setActiveFilter("all");
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleStudentClick = (studentId: string) => {
    console.log(studentId);
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

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Container disableGutters>
      <Box sx={{ padding: 2, marginBottom: 2, textAlign: "center" }}>
        <Typography
          variant="h3"
          component="div"
          gutterBottom
          sx={{
            color: "#fffffffd",
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "3rem" },
            marginBottom:"2px",
            padding: 2,
            //background: "linear-gradient(45deg, #509c7d 30%, #9ce0f0 90%)",
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            //display: "inline-block",
          }}
        >
          Management of Notes by Subject
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ backgroundColor: "#004643", padding: "4vh" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "#fff", marginBottom: 2 }}
          >
            Select a subject:
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
            <Paper sx={{ padding: 2, borderRadius: 2, boxShadow: 3,backgroundColor: "rgba(255, 255, 255, 0.829)",}}>
              <Typography variant="h6" component="div" gutterBottom>
                Students in{" "}
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
                  <InputLabel>Period</InputLabel>
                  <Select
                    value={selectedPeriod}
                    onChange={handlePeriodChange}
                    label="Period"
                  >
                    <MenuItem value="Primer Trimestre">
                      Period 1: February - April
                    </MenuItem>
                    <MenuItem value="Segundo Trimestre">
                      Period 2: May - July
                    </MenuItem>
                    <MenuItem value="Tercer Trimestre">
                      Period 3: August - November
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <StudentFilter
                searchTerm={searchTerm}
                onSearchTermChange={(e) => setSearchTerm(e.target.value)}
                onFilterChange={handleFilterChange} 
                activeFilter={activeFilter} 
              />
              <Divider sx={{ marginY: 2 }} />
              <StudentTable
                students={filteredStudents}
                onEditClick={handleEditClick}
                onStudentClick={handleStudentClick}
                activeFilter={activeFilter} 
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
