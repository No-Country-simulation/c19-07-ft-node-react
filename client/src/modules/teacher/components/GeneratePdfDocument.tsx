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
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAxiosPrivate } from "../../../hooks";
import { useAuthStore } from "../../../hooks/useAuthStore";
import AddIcon from "@mui/icons-material/Add";
import ClassRoomChart from "./ClassRoomChart";
import GeneralAverage from "./GeneralAverage";
interface AcademicRecord {
  historial_id: string;
  name: string;
  comment: string;
  date: string;
  mark: number;
}
interface Student {
  student_id: string;
  name: string;
  grade: string;
  section: string;
  parentName: string;
  educationalLevel: string;
  feedback: string;
  academicRecords: AcademicRecord[];
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
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [studentFeedback, setStudentFeedback] = useState<string>("");
  // const [courseId, setCourseId] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [newRecord, setNewRecord] = useState<AcademicRecord>({
    historial_id: "",
    name: "",
    comment: "",
    date: "",
    mark: 0,
  });
  const [editableRecords, setEditableRecords] = useState<AcademicRecord[]>([]);
  const { studentId, courseId } = useParams<{ studentId: string; courseId: string }>();
  const api = useAxiosPrivate();
  const { user } = useAuthStore();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await api.get(
          `/professors/assigned_students/${user.Professors[0].professor_id}`
        );
        const studentData = response.data.data.find((course: any) =>
          course.students.some(
            (student: Student) => student.student_id === studentId
          )
        );
        const student = studentData.students.find(
          (student: Student) => student.student_id === studentId
        );
        setSelectedStudent(student);
        setEditableRecords(student.academicRecords); 
        setStudentFeedback(student.feedback || ""); 
      } catch (error) {
        console.error("Error fetching students data:", error);
        setSnackbarMessage("Error fetching students data.");
        setSnackbarOpen(true);
      }
    };

    fetchStudentData();
  }, [studentId, api, user]);

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
    pdf.save(`${selectedStudent?.name}_report.pdf`);

    setSnackbarMessage("PDF descargado con éxito!");
    setSnackbarOpen(true);
  };

  // const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setStudentFeedback(event.target.value);
  // };

  const handleSaveChanges = async () => {
    // Implement logic to save changes to the server
    try {
      await api.put(`/students/${selectedStudent?.student_id}`, {
        academicRecords: editableRecords,
        feedback: studentFeedback,
      });
      setSnackbarMessage("Changes saved successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving changes:", error);
      setSnackbarMessage("Error saving changes.");
      setSnackbarOpen(true);
    }

    setIsEditing(false); 
  };

  const handleAddRecord = async () => {
    try {
      const userDate = new Date(newRecord.date);
      if (isNaN(userDate.getTime())) {
        throw new Error("Invalid date format");
      }
      const isoDate = userDate.toISOString(); 
      await api.post('/professors/evaluations', {
        student_id: selectedStudent?.student_id, 
        name: newRecord.name,
        date: isoDate,
        mark: newRecord.mark,
        comment: newRecord.comment,
        curso_id: courseId 
      });
  
      setEditableRecords([...editableRecords, newRecord]);
  
      setSnackbarMessage("Academic record added successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding academic record:", error);
      setSnackbarMessage("Error adding academic record.");
      setSnackbarOpen(true);
    }
  
    setModalOpen(false);
    setNewRecord({
      name: "",
      date: "",
      mark: 0,
      comment: "",
    });
  };
  





  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleRecordChange = (
    index: number,
    field: keyof AcademicRecord,
    value: any
  ) => {
    const updatedRecords = [...editableRecords];
    updatedRecords[index] = { ...updatedRecords[index], [field]: value };
    setEditableRecords(updatedRecords);
  };

  if (!selectedStudent) return <Typography variant="h6">Loading...</Typography>;

  const { name, grade, section, parentName, educationalLevel } = selectedStudent;

  return (
    <>
      <Box sx={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: "#0c0c0cfc",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "3.5rem" },
            padding: 2,
            borderRadius: 2,
            boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
          }}
        >
          Student Report: <strong>{name}</strong>
        </Typography>
        <Box ref={reportRef} sx={{ maxWidth: "800px", margin: "0 auto" }}>
          <Box
            sx={{
              color: "#0a0a0ad2",
              marginBottom: "20px",
              marginTop: "40px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontSize: "2rem" }}
            >
              <strong>Student Data</strong>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              <strong>Grade:</strong> {grade}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              <strong>Section:</strong> {section}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              <strong>Educational Level:</strong> {educationalLevel || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.5rem" }}>
              <strong>Parent:</strong> {parentName}
            </Typography>
          </Box>
          <ClassRoomChart  studentId={studentId} courseId={courseId} />
          <Card
            sx={{
              marginBottom: "20px",
              padding: "15px",
              backgroundColor: "#ffffffd5",
            }}
          >
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Academic Records Period 3
                  <IconButton
                    onClick={() => setModalOpen(true)}
                    sx={{ marginLeft: 2 }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              }
            />
            <CardContent>
              <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Record Name</TableCell>
                      <TableCell>Comment</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Mark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {editableRecords.map((record, index) => (
                      <TableRow key={record.historial_id}>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              value={record.name}
                              onChange={(e) =>
                                handleRecordChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            record.name
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              value={record.comment}
                              onChange={(e) =>
                                handleRecordChange(
                                  index,
                                  "comment",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            record.comment
                          )}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              type="date"
                              value={
                                new Date(record.date)
                                  .toISOString()
                                  .split("T")[0]
                              }
                              onChange={(e) =>
                                handleRecordChange(
                                  index,
                                  "date",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            new Date(record.date).toLocaleDateString()
                          )}
                        </TableCell>
                        <TableCell style={{ color: getMarkColor(record.mark) }}>
                          {isEditing ? (
                            <TextField
                              type="number"
                              value={record.mark}
                              onChange={(e) =>
                                handleRecordChange(
                                  index,
                                  "mark",
                                  parseFloat(e.target.value)
                                )
                              }
                            />
                          ) : (
                            record.mark
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <GeneralAverage/>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2, fontSize: "2rem" }}>
            Student Feedback
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={studentFeedback} 
            onChange={(e) => setStudentFeedback(e.target.value)} 
            disabled={!isEditing} 
            sx={{
              marginBottom: 2,
              backgroundColor: "#fffffff8",
              borderRadius: "4px",
            }}
          />
        </Box>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
          <Button
            variant="contained"
            onClick={handleDownloadPDF}
            sx={{ marginRight: 2 }}
          >
            Download PDF
          </Button>
          <Button
            variant="contained"
            onClick={isEditing ? handleSaveChanges : () => setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Document"}
          </Button>
        </Box>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={{ ...modalStyle }}>
            <Typography id="modal-title" variant="h6" component="h2">
              Add New Academic Record
            </Typography>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              value={newRecord.name}
              onChange={(e) =>
                setNewRecord({ ...newRecord, name: e.target.value })
              }
            />
            <TextField
              label="Comment"
              fullWidth
              margin="normal"
              value={newRecord.comment}
              onChange={(e) =>
                setNewRecord({ ...newRecord, comment: e.target.value })
              }
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              margin="normal"
              value={newRecord.date}
              onChange={(e) =>
                setNewRecord({ ...newRecord, date: e.target.value })
              }
            />
            <TextField
              label="Mark"
              type="number"
              fullWidth
              margin="normal"
              value={newRecord.mark}
              onChange={(e) =>
                setNewRecord({ ...newRecord, mark: parseFloat(e.target.value) })
              }
            />
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button variant="contained" onClick={handleAddRecord}>
                Add Record
              </Button>
              <Button variant="outlined" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default GeneratePdfDocument;
