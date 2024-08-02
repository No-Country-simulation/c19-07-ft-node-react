import React from 'react';
import { Typography, TextField, Box } from '@mui/material';

interface FeedbackSectionProps {
  feedback: string;
  onFeedbackChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback, onFeedbackChange, isEditing }) => {
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
        onChange={onFeedbackChange}
        disabled={!isEditing}
        sx={{ marginBottom: 2, backgroundColor: "#fffffff8", borderRadius: "4px" }}
      />
    </Box>
  );
};

export default FeedbackSection;
