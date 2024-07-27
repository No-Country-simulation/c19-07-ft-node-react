/* import { type ChangeEvent, useRef } from "react";

import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChangeSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onChange(event.target.value);
    }, 500);
  };

  return (
    <TextField
      label="Search"
      placeholder="Filter by name..."
      onChange={handleChangeSelect}
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
 */

import { type ChangeEvent, useRef } from "react";
import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

interface SearchInputProps {
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  debounceTime?: number;
  sx?: object;
}

export const SearchInput = ({
  onChange,
  placeholder = "Filter by name...",
  label = "Search",
  debounceTime = 500,
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
      label={label}
      placeholder={placeholder}
      onChange={handleChange}
      sx={sx}
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
