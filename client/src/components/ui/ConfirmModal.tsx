import {
  Box,
  Fade,
  Modal,
  Button,
  Backdrop,
  Typography,
  CircularProgress,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ConfirmModalProps {
  open: boolean;
  isLoading?: boolean;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const ConfirmModal = ({
  open,
  onClose,
  isLoading,
  onConfirm,
  confirmText,
}: ConfirmModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={!isLoading ? onClose : undefined}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {confirmText}
          </Typography>

          <Box mt={2} display="flex" justifyContent="end" gap={1}>
            <Button
              color="info"
              variant="contained"
              onClick={onClose}
              disabled={isLoading}
            >
              No
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading && (
                <CircularProgress color="error" size={15} sx={{ mr: 1 }} />
              )}
              Yes
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
