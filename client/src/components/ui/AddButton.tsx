import { Button, type Theme, type SxProps } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

interface AddButtonProps {
  sx?: SxProps<Theme>;
  label: string;
  variant?: "text" | "outlined" | "contained";
  onClick?: () => void;
}

export const AddButton = ({ sx, label, variant, onClick }: AddButtonProps) => {
  return (
    <Button
      variant={variant}
      startIcon={<PersonAdd />}
      sx={sx}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
