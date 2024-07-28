import type { PropsWithChildren } from "react";

import {
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Close } from "@mui/icons-material";

type CustomDialogProps = PropsWithChildren & {
  open: boolean;
  title: string;
  onClose: () => void;
};

export const CustomDialog = ({
  open,
  title,
  onClose,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} fullWidth>
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
    </Dialog>
  );
};
