import { type ChangeEvent, useRef } from "react";

import { Search } from "@mui/icons-material";
import {
  TextField,
  type Theme,
  type SxProps,
  InputAdornment,
} from "@mui/material";

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  debounceTime?: number;
  sx?: SxProps<Theme>;
}

export const SearchInput = ({
  onChange,
  label = "Search",
  debounceTime = 500,
  placeholder = "Filter by name...",
  sx = { width: { xs: "100%", sm: "40%" } },
}: SearchInputProps) => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onChange(event.target.value);
    }, debounceTime);
  };

  return (
    <TextField
      sx={sx}
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};
