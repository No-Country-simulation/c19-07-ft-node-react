import { Modal, Backdrop, Fade, Box, Typography, Button } from "@mui/material";

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
  confirmText: string;
  onClose: () => void;
  onConfirmDeletion: () => void;
}

export const ConfirmModal = ({
  open,
  onClose,
  confirmText,
  onConfirmDeletion,
}: ConfirmModalProps) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
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
            <Button variant="contained" color="info" onClick={onClose}>
              No
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={onConfirmDeletion}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
