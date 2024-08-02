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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxiosPrivate } from "../../../hooks";
import { useAuthStore } from "../../../hooks/useAuthStore";
import AddIcon from "@mui/icons-material/Add";
import ClassRoomChart from "./ClassRoomChart";
import GeneralAverage from "./GeneralAverage";
import FeedbackSection from "./StudentFeedback";
import ActionButtons from "./ActionsButtons";
import StudentReportData from "./StudentReportData";
interface AcademicRecord {
  historial_id?: string;
  name: string;
  comment: string;
  date: string;
  mark: number;
  period?: number;
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
  const [periods, setPeriods] = useState<Array<number | undefined>>([]); // coregir
  const [selectedPeriod, setSelectedPeriod] = useState<number | undefined>(2);
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
  const { studentId, courseId } = useParams<{
    studentId: string;
    courseId: string;
  }>();
  const api = useAxiosPrivate();
  const { user } = useAuthStore();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if(user === null || user.Professors === undefined) {
          throw new Error('User not authenticated');
        }
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

  useEffect(() => {
    if (selectedStudent) {
      const availablePeriods = Array.from(
        new Set(selectedStudent.academicRecords.map((record) => record.period))
      );
      setPeriods(availablePeriods);
      setSelectedPeriod(availablePeriods[0]); // Configura el período inicial
    }
  }, [selectedStudent]);

  useEffect(() => {
    if (selectedStudent) {
      const filteredRecords = selectedStudent.academicRecords.filter(
        (record) => record.period === selectedPeriod
      );
      setEditableRecords(filteredRecords);
    }
  }, [selectedPeriod, selectedStudent]);

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


  const handleDeleteRecord = async (historialId?: string) => {
    try {
      await api.delete(`/professors/evaluations/${historialId}`); // URL para eliminar el registro
      setEditableRecords(
        editableRecords.filter((record) => record.historial_id !== historialId)
      );
      setSnackbarMessage("Academic record deleted successfully!");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error deleting academic record:", error);
      setSnackbarMessage("Error deleting academic record.");
      setSnackbarOpen(true);
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleAddRecord = async () => {
    try {
      const userDate = new Date(newRecord.date);
      if (isNaN(userDate.getTime())) {
        throw new Error("Invalid date format");
      }
      const isoDate = userDate.toISOString();
      await api.post("/professors/evaluations", {
        student_id: selectedStudent?.student_id,
        name: newRecord.name,
        date: isoDate,
        mark: newRecord.mark,
        comment: newRecord.comment,
        curso_id: courseId,
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

  const { name } =
    selectedStudent;

  return (
    <>
      <Box sx={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: "#ffffff",
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
          <StudentReportData
            name={selectedStudent.name}
            grade={selectedStudent.grade}
            section={selectedStudent.section}
            educationalLevel={selectedStudent.educationalLevel}
            parentName={selectedStudent.parentName}
          />
          <ClassRoomChart studentId={studentId} courseId={courseId} />
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
                  <FormControl fullWidth sx={{ marginBottom: 2 }}>
                    <InputLabel>Academy Record</InputLabel>
                    <Select
                      value={selectedPeriod}
                      onChange={(e) =>
                        setSelectedPeriod(Number(e.target.value))
                      }
                    >
                      {periods.map((period) => (
                        <MenuItem key={period} value={period}>
                          Period {period}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                      <TableCell>Period</TableCell>
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
                        <TableCell>
                          {isEditing ? (
                            <TextField
                              value={record.period}
                              onChange={(e) =>
                                handleRecordChange(
                                  index,
                                  "comment",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            record.period
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
                        <TableCell>
                          {isEditing ? (
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDeleteRecord(record.historial_id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <GeneralAverage selectedPeriod={selectedPeriod} />
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
        <FeedbackSection
          feedback={studentFeedback}
          onFeedbackChange={(e) => setStudentFeedback(e.target.value)}
          isEditing={isEditing}
        />
        <ActionButtons
          isEditing={isEditing}
          onDownloadPDF={handleDownloadPDF}
          onSaveChanges={handleSaveChanges}
          onEdit={() => setIsEditing(true)}
        />
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
