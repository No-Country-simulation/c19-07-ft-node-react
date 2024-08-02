import React from 'react';
import { Button, Box } from '@mui/material';

interface ActionButtonsProps {
  isEditing: boolean;
  onDownloadPDF: () => void;
  onSaveChanges: () => void;
  onEdit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEditing,
  onDownloadPDF,
  onSaveChanges,
  onEdit,
}) => {
  return (
    <Box sx={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="contained" onClick={onDownloadPDF} sx={{ marginRight: 2 }}>
        Download PDF
      </Button>
      <Button variant="contained" onClick={isEditing ? onSaveChanges : onEdit}>
        {isEditing ? "Save Changes" : "Edit Document"}
      </Button>
    </Box>
  );
};

export default ActionButtons;
