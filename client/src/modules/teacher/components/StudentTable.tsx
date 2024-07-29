import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  
  interface Student {
    student_id: string;
    name: string;
    educationalLevel: string;
    grade: string;
    section: string;
    mark?: number;
  }
  
  interface StudentTableProps {
    students: Student[];
    onStudentClick: (studentId: string) => void;
    onEditClick: (studentId: string, currentGrade?: number) => void;
  }
  
  const StudentTable = ({ students, onStudentClick, onEditClick }: StudentTableProps) => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: "2rem", maxWidth: "100%" }}>
        <Table aria-label="student table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Nivel Educativo</TableCell>
              <TableCell>Grado</TableCell>
              <TableCell>Sección</TableCell>
              <TableCell>Nota Promedio</TableCell>
              <TableCell>Actualizar Nota</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No hay estudiantes para mostrar.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              students.map((student, index) => (
                <TableRow key={student.student_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    onClick={() => onStudentClick(student.student_id)}
                    sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                  >
                    {student.name}
                  </TableCell>
                  <TableCell>{student.educationalLevel}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>
                    {student.mark !== undefined ? student.mark : "N/A"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => onEditClick(student.student_id, student.mark)}
                      sx={{ color: "primary.main" }}
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
    );
  };
  
  export default StudentTable;
  