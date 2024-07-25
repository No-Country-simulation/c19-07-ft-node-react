import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

export const SearchInput = () => {
  return (
    <TextField
      label="Search"
      placeholder="Filter by name..."
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
