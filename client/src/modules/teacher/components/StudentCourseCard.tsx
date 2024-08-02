// import {
//     Card,
//     CardContent,
//     CardHeader,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     TextField,
//   } from "@mui/material";
  
//   interface AcademicRecord {
//     recordId: string;
//     comment: string;
//     date: string;
//     mark: number;
//     name: string;
//   }
  
//   interface Course {
//     cursos_id: string;
//     nombre: string;
//     descripcion?: string;
//     academicRecords: AcademicRecord[];
//   }
  
//   interface CourseCardProps {
//     course: Course;
//     onCommentChange: (courseId: string, recordId: string, newComment: string) => void;
//   }
  
//   const getMarkColor = (mark: number) => {
//     if (mark <= 49) {
//       return "red";
//     } else if (mark >= 50 && mark <= 80) {
//       return "blue";
//     } else {
//       return "green";
//     }
//   };
  
//   const CourseCard: React.FC<CourseCardProps> = ({ course, onCommentChange }) => {
//     return (
//       <Card
//         key={course.cursos_id}
//         sx={{ marginBottom: "20px", padding: "15px", backgroundColor: "#ffffffd5" }}
//       >
//         <CardHeader
//           title={`Course: ${course.nombre}`}
//           subheader={course.descripcion || "No description available"}
//         />
//         <CardContent>
//           <Typography variant="h6">Academic Records</Typography>
//           <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Record Name</TableCell>
//                   <TableCell>Comment</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Mark</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {course.academicRecords.map((record) => (
//                   <TableRow key={record.recordId}>
//                     <TableCell>{record.name}</TableCell>
//                     <TableCell>
//                       <TextField
//                         value={record.comment}
//                         onChange={(e) =>
//                           onCommentChange(course.cursos_id, record.recordId, e.target.value)
//                         }
//                         fullWidth
//                       />
//                     </TableCell>
//                     <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
//                     <TableCell style={{ color: getMarkColor(record.mark) }}>
//                       {record.mark}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>
//     );
//   };
  
//   export default CourseCard;
  