import {
  Paper,
  Table,
  Tooltip,
  TableRow,
  Skeleton,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  TableContainer,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

import { v4 as uuidv4 } from "uuid";

type Column = {
  id: string;
  label: string;
  format?: (value: any) => string;
};

type Action = "edit" | "delete";

interface CustomTableProps {
  rows: any[];
  columns: Column[];
  isLoading: boolean;
  actions?: [Action, Action?];
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  children?: React.ReactNode;
}

export const CustomTable = ({
  rows,
  onEdit,
  columns,
  onDelete,
  children,
  isLoading,
  actions = ["edit", "delete"],
}: CustomTableProps) => {
  return (
    <Paper
      sx={{ bgcolor: "secondary.main", width: "100%", overflow: "hidden" }}
    >
      <TableContainer
        sx={{
          maxHeight: { xs: "calc(100vh - 376.5px)", sm: "calc(100vh - 268px)" },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell key={id} sx={{ fontWeight: "bold", color: "white" }}>
                  {label}
                </TableCell>
              ))}
              {actions && (
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              rows.map((row) => (
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {value
                          ? column.format
                            ? column.format(value)
                            : value
                          : "n/a"}
                      </TableCell>
                    );
                  })}
                  {actions && (
                    <TableCell>
                      {actions.includes("edit") && (
                        <Tooltip title="Edit">
                          <IconButton color="info" onClick={() => onEdit(row)}>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      )}
                      {actions.includes("delete") && (
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => onDelete(row)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            {!isLoading && rows.length <= 0 && (
              <TableRow>
                <TableCell
                  colSpan={actions ? columns.length + 1 : columns.length}
                  align="center"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
            {isLoading &&
              Array.from({ length: rows.length ? rows.length : 10 }).map(
                (_, index) => (
                  <TableRow key={index}>
                    <TableCell
                      colSpan={actions ? columns.length + 1 : columns.length}
                    >
                      <Skeleton height="40px" />
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {children}
    </Paper>
  );
};
