import {
  Grid,
  Button,
  MenuItem,
  TextField,
  CircularProgress,
  type GridOwnProps,
} from "@mui/material";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

type FormField = {
  name: string;
  label?: string;
  type?: string;
  multiline?: boolean;
  placeholder?: string;
  select?: { value: string; label: string }[];
};

interface CustomFormProps {
  columns?: GridOwnProps["columns"];
  register: UseFormRegister<any>;
  formFields: FormField[];
  errors: FieldErrors<any>;
  submitButtonLabel: string;
  isSubmitting?: boolean;
  isLoadingDefaultValues?: boolean;
  onSubmit: () => void;
}

export const CustomForm = ({
  errors,
  columns = { xs: 6, sm: 12 },
  onSubmit,
  register,
  formFields,
  isSubmitting,
  submitButtonLabel,
  isLoadingDefaultValues,
}: CustomFormProps) => {
  return (
    <Grid
      container
      columns={columns}
      spacing={3}
      component="form"
      onSubmit={onSubmit}
    >
      {formFields.map(
        ({ label, type, name, select, multiline, placeholder }) => (
          <Grid key={name} item xs={6}>
            <TextField
              fullWidth
              select={!!select}
              label={label}
              type={type}
              multiline={multiline}
              maxRows={4}
              variant="standard"
              placeholder={placeholder}
              {...register(name)}
              error={!!errors[name]}
              helperText={errors[name]?.message as string}
              disabled={isSubmitting || isLoadingDefaultValues}
            >
              {select &&
                select.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
        )
      )}

      <Grid item xs={12} sm={3}>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          disabled={isSubmitting || isLoadingDefaultValues}
        >
          {isSubmitting && <CircularProgress size={15} sx={{ mr: 1 }} />}
          {submitButtonLabel}
        </Button>
      </Grid>
    </Grid>
  );
};
