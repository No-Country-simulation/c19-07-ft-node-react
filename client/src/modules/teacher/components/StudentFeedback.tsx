// import React from 'react';
// import { Typography, TextField, Box } from '@mui/material';

// interface FeedbackSectionProps {
//   feedback: string;
//   onFeedbackChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   isEditing: boolean;
// }

// const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, onFeedbackChange, isEditing }) => {
//   return (
//     <Box sx={{ marginTop: 4 }}>
//       <Typography variant="h6" sx={{ marginBottom: 2, fontSize: "2.5rem", fontWeight: "bold", color: "#ffffff" }}>
//         Student Feedback
//       </Typography>
//       <TextField
//         fullWidth
//         multiline
//         rows={4}
//         value={feedback}
//         onChange={onFeedbackChange}
//         disabled={!isEditing}
//         sx={{ marginBottom: 2, backgroundColor: "#fffffff8", borderRadius: "4px" }}
//       />
//     </Box>
//   );
// };

// export default FeedbackSection;



import React, { useCallback, useState } from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface FeedbackSectionProps {
  feedback: string;
  onFeedbackChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, onFeedbackChange, isEditing }) => {
  const { studentId } = useParams<{ studentId: string }>(); // Obtén el ID del estudiante de la URL
  const [isSaving, setIsSaving] = useState(false); // Estado para manejar el estado de guardado

  const handleFeedbackChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFeedbackChange(event); // Llama a la función para actualizar el estado local
    },
    [onFeedbackChange]
  );

  const handleSave = useCallback(async () => {
    if (isEditing) {
      setIsSaving(true); // Marca el inicio del proceso de guardado
      try {
        await axios.put(`http://localhost:3001/api/v1/students/${studentId}`, {
          feedback
        });
        // Puedes agregar una notificación de éxito aquí si lo deseas
      } catch (error) {
        console.error('Error updating feedback:', error);
        // Puedes agregar una notificación de error aquí si lo deseas
      } finally {
        setIsSaving(false); // Marca el fin del proceso de guardado
      }
    }
  }, [feedback, studentId, isEditing]);

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h6" sx={{ marginBottom: 2, fontSize: "2.5rem", fontWeight: "bold", color: "#ffffff" }}>
        Student Feedback
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={handleFeedbackChange} // Usa la función modificada aquí
        disabled={!isEditing}
        sx={{ marginBottom: 2, backgroundColor: "#fffffff8", borderRadius: "4px" }}
      />
      {isEditing && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isSaving} // Desactiva el botón mientras se guarda
        >
          {isSaving ? 'Saving...' : 'Save Feedback'}
        </Button>
      )}
    </Box>
  );
};

export default FeedbackSection;
