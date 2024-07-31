import React from "react";
import { TextField, Box, Button, ButtonGroup } from "@mui/material";

interface StudentFilterProps {
  searchTerm: string;
  onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

const StudentFilter: React.FC<StudentFilterProps> = ({
  searchTerm,
  onSearchTermChange,
  onFilterChange,
  activeFilter,
}) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <TextField
        variant="outlined"
        label="Search student"
        fullWidth
        value={searchTerm}
        onChange={onSearchTermChange}
      />
      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
        <ButtonGroup>
          <Button
            variant={activeFilter === "all" ? "contained" : "outlined"}
            onClick={() => onFilterChange("all")}
          >
            All
          </Button>
          <Button
            variant={activeFilter === "below50" ? "contained" : "outlined"}
            onClick={() => onFilterChange("below50")}
          >
            Below 49
          </Button>
          <Button
            variant={activeFilter === "between51and80" ? "contained" : "outlined"}
            onClick={() => onFilterChange("between51and80")}
          >
            50 - 80
          </Button>
          <Button
            variant={activeFilter === "above80" ? "contained" : "outlined"}
            onClick={() => onFilterChange("above80")}
          >
            Above 80
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default StudentFilter;

