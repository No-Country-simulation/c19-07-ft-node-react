// SuccessSnackbar.tsx
import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface SuccessSnackbarProps {
  open: boolean;
  onClose: () => void;
}

const SuccessSnackbar: React.FC<SuccessSnackbarProps> = ({ open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity="success">
        Nota actualizada exitosamente!
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackbar;
