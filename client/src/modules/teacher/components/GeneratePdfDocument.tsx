// import React, { useRef } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// const StudentReport = () => {
//   const student = {
//     name: 'Juan Pérez',
//     grade: '5to',
//     section: 'A',
//     year: '2023-2024',
//     periods: [
//       {
//         name: 'Periodo 1: Septiembre - Diciembre',
//         courses: [
//           { name: 'Matemáticas', grade: 85, comments: 'Juan ha mostrado una buena comprensión de los conceptos básicos, pero necesita practicar más los problemas de álgebra.' },
//           { name: 'Ciencias', grade: 90, comments: 'Excelente participación en clase y en los laboratorios.' },
//           { name: 'Historia', grade: 88, comments: 'Juan ha demostrado interés en los temas históricos y realiza preguntas relevantes.' },
//           { name: 'Inglés', grade: 82, comments: 'Buen desarrollo en habilidades de lectura y escritura, pero puede mejorar en la gramática.' },
//           { name: 'Educación Física', grade: 95, comments: 'Muy activo y participativo en todas las actividades físicas.' },
//         ],
//         generalComments: 'Juan ha tenido un buen desempeño en el primer periodo. Su participación en clase es constante y muestra interés en aprender. Sin embargo, es importante que dedique más tiempo a las tareas de matemáticas para mejorar su habilidad en álgebra.'
//       }
//     ]
//   };

//   const reportRef = useRef();

//   const handleDownloadPDF = async () => {
//     const reportElement = reportRef.current;
//     const canvas = await html2canvas(reportElement);
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const imgProps = pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`${student.name}_report.pdf`);
//   };

//   return (
//     <Box sx={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <Typography variant="h4" component="h1" gutterBottom>Informe Estudiantil</Typography>
//       <Box ref={reportRef}>
//         <Typography variant="body1"><strong>Nombre del Estudiante:</strong> {student.name}</Typography>
//         <Typography variant="body1"><strong>Grado:</strong> {student.grade}</Typography>
//         <Typography variant="body1"><strong>Sección:</strong> {student.section}</Typography>
//         <Typography variant="body1"><strong>Año Escolar:</strong> {student.year}</Typography>

//         {student.periods.map((period, index) => (
//           <Box key={index} sx={{ marginTop: '20px' }}>
//             <Typography variant="h5" component="h2" gutterBottom>{period.name}</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Curso</TableCell>
//                     <TableCell>Nota</TableCell>
//                     <TableCell>Comentarios</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {period.courses.map((course, courseIndex) => (
//                     <TableRow key={courseIndex}>
//                       <TableCell>{course.name}</TableCell>
//                       <TableCell>{course.grade}</TableCell>
//                       <TableCell>{course.comments}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Typography variant="body1" sx={{ marginTop: '10px' }}><strong>Comentarios Generales:</strong> {period.generalComments}</Typography>
//           </Box>
//         ))}
//       </Box>
//       <Button variant="contained" color="primary" onClick={handleDownloadPDF} sx={{ marginTop: '20px' }}>
//         Descargar PDF
//       </Button>
//     </Box>
//   );
// };

// export default StudentReport;
