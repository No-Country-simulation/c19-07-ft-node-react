// import { useState } from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import axios from 'axios';

// const StudentFeedback = ({ studentId, initialFeedback, isEditing }) => {
//   const [studentFeedback, setStudentFeedback] = useState(initialFeedback);
//   const [isSaving, setIsSaving] = useState(false);

//   const handleSaveFeedback = async () => {
//     setIsSaving(true);
//     try {
//       await axios.post(`http://localhost:3001/api/v1/students/${studentId}`, { feedback: studentFeedback });
//       // Manejar respuesta exitosa aquí
//     } catch (error) {
//       // Manejar error aquí
//       console.error('Error al guardar el feedback:', error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ marginTop: 4 }}>
//       <Typography variant="h6" sx={{ marginBottom: 2, fontSize: '2rem' }}>
//         Student Feedback
//       </Typography>
//       <TextField
//         fullWidth
//         multiline
//         rows={4}
//         value={studentFeedback}
//         onChange={(e) => setStudentFeedback(e.target.value)}
//         disabled={!isEditing}
//         sx={{
//           marginBottom: 2,
//           backgroundColor: '#fffffff8',
//           borderRadius: '4px',
//         }}
//       />
//       {isEditing && (
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSaveFeedback}
//           disabled={isSaving}
//         >
//           {isSaving ? 'Saving...' : 'Save Feedback'}
//         </Button>
//       )}
//     </Box>
//   );
// };

// export default StudentFeedback;
