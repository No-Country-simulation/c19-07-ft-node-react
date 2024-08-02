import React from 'react';
import { Box, Typography } from '@mui/material';

interface StudentReportHeaderProps {
  name: string;
  grade: string;
  section: string;
  educationalLevel: string;
  parentName: string;
}

const StudentReportData: React.FC<StudentReportHeaderProps> = ({
  grade,
  section,
  educationalLevel,
  parentName,
}) => {
  return (
    <Box
      sx={{
        color: "#0a0a0ad2",
        marginBottom: "40px",
        marginTop: "40px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom sx={{ fontSize: "2rem", color: "#ffffff" }}>
        <strong>Student Data</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.5rem", color: "#ffffff" }}>
        Grade: <strong>{grade}</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.5rem", color: "#ffffff" }}>
        Section: <strong>{section}</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.5rem", color: "#ffffff" }}>
        Educational Level: <strong>{educationalLevel || "N/A"}</strong>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.5rem", color: "#ffffff" }}>
        Parent: <strong>{parentName}</strong>
      </Typography>
    </Box>
  );
};

export default StudentReportData;
