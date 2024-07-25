import { Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

interface AddButtonProps {
  onClick?: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Button
      variant="outlined"
      sx={{ width: { xs: "100%", sm: "120px" }, ml: { xs: 0, sm: "auto" } }}
      startIcon={<PersonAdd />}
      onClick={onClick}
    >
      Add
    </Button>
  );
};
