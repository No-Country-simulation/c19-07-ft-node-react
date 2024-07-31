import type { PropsWithChildren } from "react";

import { Close } from "@mui/icons-material";
import {
  Dialog,
  type Theme,
  IconButton,
  DialogTitle,
  type SxProps,
  DialogContent,
} from "@mui/material";

type CustomDialogProps = PropsWithChildren & {
  open: boolean;
  title: string;
  sx?: SxProps<Theme>;
  onClose: () => void;
};

export const CustomDialog = ({
  sx = { width: "100%" },
  open,
  title,
  onClose,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} PaperProps={{ sx }}>
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
