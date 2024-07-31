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
  activeFilter: string;
}

const getMarkColor = (mark: number) => {
  if (mark <= 49) {
    return "red";
  } else if (mark >= 50 && mark <= 80) {
    return "blue";
  } else {
    return "green";
  }
};

const StudentTable = ({
  students,
  onStudentClick,
  onEditClick,
  activeFilter,
}: StudentTableProps) => {
  const filteredStudents = students.filter(student => {
    if (activeFilter === "all") return true;
    if (activeFilter === "below49") return student.mark !== undefined && student.mark < 50;
    if (activeFilter === "between50and80") return student.mark !== undefined && student.mark >= 50 && student.mark <= 80;
    if (activeFilter === "above80") return student.mark !== undefined && student.mark > 80;
    return true;
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ marginTop: "2rem", maxWidth: "100%"}}
    >
      <Table aria-label="student table">
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Education level</TableCell>
            <TableCell>Grade</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Average score</TableCell>
            <TableCell>Update Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
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
                <TableCell
                  sx={{
                    color: student.mark !== undefined ? getMarkColor(student.mark) : "inherit",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  {student.mark !== undefined ? student.mark : "N/A"}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() =>
                      onEditClick(student.student_id, student.mark)
                    }
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


