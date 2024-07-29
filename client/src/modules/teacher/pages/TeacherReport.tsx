import { useParams } from "react-router-dom";
import ButtonArrowBack from "../components/ButtonArrowBack";
// import ClassRoomChart from "../components/ClassRoomChart";
// import GeneratePdfDocument from "../components/GeneratePdfDocument"

export const TeacherReport = () => {
  const { studentId } = useParams();

  return (
    <div>
      <ButtonArrowBack />
      <h2>{studentId ? `Report for Student ID: ${studentId}` : "Loading student details..."}</h2>
      {/* <GeneratePdfDocument/> */}
      {/* <ClassRoomChart /> */}
    </div>
  );
};



// import React, { useState, useEffect } from 'react';
// import { Button } from '@mui/material';
// import { PDFViewer } from '@react-pdf/renderer';
// import GeneratePdfDocument from '../components/GeneratePdfDocument';
// import ButtonArrowBack from '../components/ButtonArrowBack';
// import ClassRoomChart from '../components/ClassRoomChart';

// interface Grade {
//   subject: string;
//   grade: number;
// }

// interface StudentDetails {
//   studentName: string;
//   course: string;
//   period: string;
//   grades: Grade[];
//   comments: string;
// }

// export const TeacherReport: React.FC = () => {
//   const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);

//   useEffect(() => {
//     // Simulación de obtener detalles del estudiante
//     setStudentDetails({
//       studentName: "Juan Pérez",
//       course: "Matemáticas",
//       period: "Q1 2024",
//       grades: [
//         { subject: "Álgebra", grade: 85 },
//         { subject: "Geometría", grade: 90 },
//         { subject: "Cálculo", grade: 78 },
//       ],
//       comments: "Buen desempeño general, necesita mejorar en cálculo.",
//     });
//   }, []);

//   return (
//     <div>
//       <ButtonArrowBack />
//       {studentDetails ? (
//         <div>
//           <h2>{`Reporte de: ${studentDetails.studentName}`}</h2>
//           <div style={{ height: "600px", border: "1px solid black", marginBottom: "20px" }}>
//             <PDFViewer width="100%" height="100%">
//               <GeneratePdfDocument {...studentDetails} />
//             </PDFViewer>
//           </div>
//           <Button variant="contained" color="primary">
//             Descargar PDF
//           </Button>
//         </div>
//       ) : (
//         <h2>Cargando detalles del estudiante...</h2>
//       )}
//       <ClassRoomChart />
//     </div>
//   );
// };
