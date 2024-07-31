import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAxiosPrivate } from "../../../hooks";

interface AcademicRecord {
  recordId: string;
  comment: string;
  mark: number; 
}

interface Course {
  courseId: string;
  courseName: string;
  professorName: string;
  evaluations: any[]; 
  academicRecords: AcademicRecord[];
}

interface Student {
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  parentId: string;
  contact: {
    email: string;
    phone: string | null;
  };
  courses: Course[];
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

const GeneratePdfDocument = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { studentId } = useParams();
  const api = useAxiosPrivate();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get(`/professors/details`);
        const student = response.data.data.find(
          (student: any) => student.studentId === studentId
        );
        setSelectedStudent(student);
      } catch (error) {
        console.error("Error fetching students data:", error);
        setSnackbarMessage("Error fetching students data.");
        setSnackbarOpen(true);
      }
    };

    fetchStudents();
  }, [studentId, api]);

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;

    const reportElement = reportRef.current;
    const canvas = await html2canvas(reportElement);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${selectedStudent?.studentName}_report.pdf`);

    setSnackbarMessage("PDF descargado con éxito!");
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleCommentChange = (
    courseId: string,
    recordId: string,
    newComment: string
  ) => {
    setSelectedStudent((prevState: Student | null) => {
      if (!prevState) return prevState;

      const updatedCourses = prevState.courses.map((course) => {
        if (course.courseId === courseId) {
          const updatedRecords = course.academicRecords.map((record) => {
            if (record.recordId === recordId) {
              return { ...record, comment: newComment };
            }
            return record;
          });

          return { ...course, academicRecords: updatedRecords };
        }
        return course;
      });

      return { ...prevState, courses: updatedCourses };
    });
  };

  if (!selectedStudent) return <Typography variant="h6">Loading...</Typography>;

  const { courses, contact, grade, parentId, section, studentName } =
    selectedStudent;

  return (
    <Box sx={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          color: "#0c0c0cfc",
          textAlign:"center",
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" },
          padding: 2,
          borderRadius: 2,
          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
        }}
      >
        Student Report: <strong>{studentName}</strong>
      </Typography>
      <Box ref={reportRef} sx={{ maxWidth: "800px", margin: "0 auto" }}>
        <Box
          sx={{
            color:"#0a0a0ad2",
           
            marginBottom: "20px",
            marginTop: "40px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom sx={{fontSize:"2rem"}}>
            <strong>Student Data</strong>
          </Typography>
          <Typography variant="body1" sx={{fontSize:"1.5rem"}}>
            <strong>Grade:</strong> {grade}
          </Typography>
          <Typography variant="body1" sx={{fontSize:"1.5rem"}}>
            <strong>Section:</strong> {section}
          </Typography>
          <Typography variant="body1" sx={{fontSize:"1.5rem"}}>
            <strong>Email:</strong> {contact.email}
          </Typography>
          <Typography variant="body1" sx={{fontSize:"1.5rem"}}>
            <strong>Phone:</strong> {contact.phone || "N/A"}
          </Typography>
          <Typography variant="body1" sx={{fontSize:"1.5rem"}}>
            <strong>Parent:</strong> {parentId}
          </Typography>
        </Box>
        {courses.map((course: any) => (
          <Card
            key={course.courseId}
            sx={{ marginBottom: "20px", padding: "15px", backgroundColor:"#ffffffd5"}}
          >
            <CardHeader
              title={`Course: ${course.courseName}`}
              subheader={`Teacher: ${course.professorName}`}
            />
            <CardContent>
              <Typography variant="h6">Evaluations</Typography>
              <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Evaluation Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Average Mark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {course.evaluations.map((evaluation: any) => (
                      <TableRow key={evaluation.evaluationId}>
                        <TableCell>{evaluation.name}</TableCell>
                        <TableCell>{evaluation.description}</TableCell>
                        <TableCell style={{ color: getMarkColor(evaluation.averageMark) }}>
                          {evaluation.averageMark}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {course.academicRecords.map((record: any) => (
                <Typography key={record.recordId} sx={{ textAlign: "center", color: getMarkColor(record.mark) }}>
                  General average: <strong>{record.mark}</strong>
                </Typography>
              ))}
              <Typography variant="h6">Comments</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {course.academicRecords.map((record: any) => (
                      <TableRow key={record.recordId}>
                        <TableCell>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            value={record.comment}
                            onChange={(e) =>
                              handleCommentChange(
                                course.courseId,
                                record.recordId,
                                e.target.value
                              )
                            }
                            variant="outlined"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GeneratePdfDocument;
