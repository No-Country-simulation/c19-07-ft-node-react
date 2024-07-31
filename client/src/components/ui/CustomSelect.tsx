import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";

interface CustomSelectProps {
  value: string;
  label: string;
  items: { value: string; label: string }[];
  onChange: (event: SelectChangeEvent<string>) => void;
}

export const CustomSelect = ({
  label,
  items,
  value,
  onChange,
}: CustomSelectProps) => {
  return (
    <Box width={{ xs: "100%", sm: "150px" }}>
      <FormControl fullWidth>
        <InputLabel id="custom-select-label">{label}</InputLabel>
        <Select
          labelId="custom-select-label"
          label={label}
          value={value}
          onChange={onChange}
        >
          {items.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
