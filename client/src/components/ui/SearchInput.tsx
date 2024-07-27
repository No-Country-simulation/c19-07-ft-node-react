import { type ChangeEvent, useRef } from "react";

import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useContextUser } from "../../modules/admin/components/hooks/useContextUser";

interface SearchInputProps {
  onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
  const debounceRef = useRef<NodeJS.Timeout>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      onChange(event.target.value);
    }, 500);
  };

  return (
    <TextField
      label="Search"
      placeholder="Filter by name..."
      onChange={handleChange}
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
