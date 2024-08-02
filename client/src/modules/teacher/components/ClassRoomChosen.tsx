// import { useEffect, useState } from 'react';
// import { useAxiosPrivate } from "../../../hooks";
// import { useAuthStore } from '../../../hooks/useAuthStore';

// const AssignedStudents = () => {
//  const api = useAxiosPrivate();
//   const { user } = useAuthStore(); // Obtener el usuario logueado desde el store
//   const [assignedStudents, setAssignedStudents] = useState(null);

//   useEffect(() => {
//     const fetchAssignedStudents = async () => {
//       if (user && user.user_id) { // Asegúrate de que el ID del usuario esté disponible
//         try {
//           console.log("Fetching assigned students for user:", user.user_id);
//           const response = await api.get(`/professors/assigned_students/${user.Professors[0].professor_id}`);
//           setAssignedStudents(response.data); // Guarda los datos en el estado
//           console.log("Assigned Students:", response.data); // Muestra los datos en la consola
//         } catch (error) {
//           console.error("Error fetching assigned students:", error);
//         }
//       } else {
//         console.warn("User or user_id not available"); // Log de advertencia si el usuario o el ID del usuario no están disponibles
//       }
//     };

//     fetchAssignedStudents();
//   }, [user]);

//   if (!assignedStudents) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Assigned Students</h1>
//       <pre>{JSON.stringify(assignedStudents, null, 2)}</pre> {/* Renderiza los datos */}
//     </div>
//   );
// };


// export default AssignedStudents;
//codigo para ver los datos de  http://localhost:3001/api/v1/professors/assigned_students/ID 
//con usuario autenticado










// import { useEffect, useState } from 'react';
// import { useAxiosPrivate } from "../../../hooks";

// const ClassRoomChosen = () => {
//   const [data, setData] = useState<any>(null); // Para almacenar los datos obtenidos
//   const [loading, setLoading] = useState<boolean>(true); // Para manejar el estado de carga
//   const [error, setError] = useState<string | null>(null); // Para manejar los errores

//   const api = useAxiosPrivate();
//   const endpoint = '/students/academic-records/clz1z002f000a14a0z4kta4tk';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get(endpoint);
//         setData(response.data);
//       } catch (error) {
//         setError('Error fetching data'); // Mensaje de error
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [api, endpoint]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <h1>Class Room Data</h1>
//       {/* Renderiza los datos obtenidos */}
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default ClassRoomChosen;
//codigo para ver http://localhost:3001/api/v1/students/academic_records/ID
//se ve toda la informacion del estudiante 














import { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useLocation, Link } from "react-router-dom";

interface Student {
  student_id: string;
  grade: string;
  section: string;
  user_id: string;
}

const TeacherClassChosen = () => {
  const location = useLocation();
  const students = location.state?.students as Student[] || [];

  useEffect(() => {
    students.forEach(student => {
      console.log('ID del estudiante:', student.student_id);
    });
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
                          backgroundColor: "#ffffff",
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
                          backgroundColor: "#ffffff",
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

export default TeacherClassChosen;
//este es el codigo que se queda 
