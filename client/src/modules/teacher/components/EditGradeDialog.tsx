import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface GradeDialogProps {
  open: boolean;
  grade: number | string;
  onClose: () => void;
  onSave: (newGrade: number) => void;
  onGradeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const GradeDialog = ({
  open,
  grade,
  onClose,
  onSave,
  onGradeChange,
}: GradeDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Edit Student Note</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="grade"
          label="Nota"
          type="number"
          fullWidth
          variant="outlined"
          value={grade}
          onChange={onGradeChange}
          InputProps={{
            inputProps: { min: 0, max: 100 },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={() => onSave(Number(grade))}
          variant="contained"
          color="primary"
        >
          Keep
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GradeDialog;
