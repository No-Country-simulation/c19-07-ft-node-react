import { useState } from "react";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";

const TeacherFeedback = () => {
  const [positiveFeedback, setPositiveFeedback] = useState("PositiveFeedback");
  const [constructiveFeedback, setConstructiveFeedback] = useState(
    "ConstructiveFeedback"
  );
  const [isEditing, setIsEditing] = useState(false);

  const handlePositiveFeedbackChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPositiveFeedback(event.target.value);
  };

  const handleConstructiveFeedbackChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConstructiveFeedback(event.target.value);
  };

  const handleSave = () => {
    // Aquí puedes implementar la lógica para guardar los cambios en el estado o enviar a la API
    console.log("Positive Feedback:", positiveFeedback);
    console.log("Constructive Feedback:", constructiveFeedback);
    setIsEditing(false); // Cambia a modo visualización
  };

  const handleEdit = () => {
    setIsEditing(true); // Cambia a modo edición
  };

  return (
    <Box textAlign="center">
      <p style={{ fontSize: "2rem", color: "#f3faf8b2" }}>Feedback</p>
      <Box
        sx={{
          display: "block",
          textAlign: "left",
          padding: "3vh",
          backgroundColor: "#F9BC60",
          borderRadius: "10px",
          color: "black",
        }}
      >
        {isEditing ? (
          <Box>
            <TextField
              label="Positive Feedback"
              multiline
              rows={4}
              value={positiveFeedback}
              onChange={handlePositiveFeedbackChange}
              fullWidth
              sx={{ marginBottom: "2vh" }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Constructive Feedback"
              multiline
              rows={4}
              value={constructiveFeedback}
              onChange={handleConstructiveFeedbackChange}
              fullWidth
              sx={{ marginBottom: "2vh" }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              onClick={handleSave}
              sx={{
                backgroundColor: "#004643",
                color: "white",
                "&:hover": { backgroundColor: "#003c36" },
                marginRight: 2,
              }}
            >
              <Save />
              Save
            </Button>
          </Box>
        ) : (
          <Box>
            <Box mb={2}>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Positive Feedback
              </p>
              <p>{positiveFeedback}</p>
            </Box>
            <Box mb={2}>
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Constructive Feedback
              </p>
              <p>{constructiveFeedback}</p>
            </Box>
            <IconButton
              onClick={handleEdit}
              sx={{
                backgroundColor: "#004643",
                color: "white",
                "&:hover": { backgroundColor: "#003c36" },
              }}
            >
              <Edit />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default TeacherFeedback;
