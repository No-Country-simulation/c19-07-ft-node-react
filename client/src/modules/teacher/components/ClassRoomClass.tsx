import { useState, useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface Student {
  grade: string;
  section: string;
}
const URL_BASE = "http://localhost:3001/api";

const ClassRoomClass = () => {
  const [gradeSections, setGradeSections] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    axios.get<Student[]>(`${URL_BASE}/students`)
      .then(response => {
        const studentData = response.data;
        setStudents(studentData);

        const uniqueGradeSections = new Set<string>();
        studentData.forEach(student => {
          uniqueGradeSections.add(`${student.grade}${student.section}`);
        });

        setGradeSections(Array.from(uniqueGradeSections));
      })
      .catch(error => {
        console.error("There was an error fetching the grades and sections!", error);
      });
  }, []);

  const handleBoxClick = (gradeSection: string) => {
    const studentsInGradeSection = students.filter(student => `${student.grade}${student.section}` === gradeSection);
    console.log(`Estudiantes en ${gradeSection}:`, studentsInGradeSection);
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
            {gradeSections.map((gradeSection, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Link
                  to={`/teacher/class/${gradeSection}`}
                  state={{ students: students.filter(student => `${student.grade}${student.section}` === gradeSection) }}
                  style={{ textDecoration: "none" }}
                  onClick={() => handleBoxClick(gradeSection)}
                >
                  <Box
                    component="div"
                    sx={{
                      backgroundColor: "#f9bc60",
                      height: { xs: "8vh", sm: "8vh", md: "10vh", lg: "20vh" },
                      width: "20vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "&:hover": {
                        backgroundColor: "#e16162",
                      },
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
                      {gradeSection}
                    </Box>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClassRoomClass;
