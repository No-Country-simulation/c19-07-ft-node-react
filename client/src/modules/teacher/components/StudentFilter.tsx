// StudentFilter.tsx
import React from "react";
import { TextField, Box } from "@mui/material";

interface StudentFilterProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StudentFilter: React.FC<StudentFilterProps> = ({ searchTerm, onSearchTermChange }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        variant="outlined"
        label="Buscar estudiante"
        fullWidth
        value={searchTerm}
        onChange={onSearchTermChange}
      />
    </Box>
  );
};

export default StudentFilter;
