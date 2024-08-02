import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

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
  activeFilter: string;
}

const StudentTable = ({
  students,
  onStudentClick,
  activeFilter,
}: StudentTableProps) => {
  const filteredStudents = students.filter(student => {
    if (activeFilter === "all") return true;
    return `${student.grade}${student.section}` === activeFilter;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "2rem", maxWidth: "100%" }}
    >
      <Table aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Education level</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="textSecondary">
                  No students to show.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredStudents.map((student, index) => (
              <TableRow key={student.student_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell
                  onClick={() => onStudentClick(student.student_id)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {student.name}
                </TableCell>
                <TableCell>{student.educationalLevel}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.section}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;

