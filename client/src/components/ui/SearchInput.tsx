import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
  return (
    <TextField
      label="Search"
      placeholder="Filter by name..."
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: { xs: "100%", sm: "40%" } }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    ></TextField>
  );
};
