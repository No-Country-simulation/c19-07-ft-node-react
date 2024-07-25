import type { PropsWithChildren } from "react";

import {
  Button,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type CustomDialogProps = PropsWithChildren & {
  open: boolean;
  title: string;
  btnLabel: string;
  onClose: () => void;
  // onActionButtonClick: (userData: any) => void;
};

export const CustomDialog = ({
  open,
  title,
  onClose,
  btnLabel,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 24,
          top: 12,
        }}
      >
        <Close />
      </IconButton>

      <DialogContent>{children}</DialogContent>

      <DialogActions>
        <Button variant="contained">{btnLabel}</Button>
      </DialogActions>
    </Dialog>
  );
};
