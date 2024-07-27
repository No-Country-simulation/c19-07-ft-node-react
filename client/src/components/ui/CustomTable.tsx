import type { ChangeEvent } from "react";

import {
  Paper,
  Table,
  Tooltip,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  IconButton,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface CustomTableProps {
  rows: any[];
  columns: { id: string; label: string }[];
  isLoading: boolean;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
  children?: React.ReactNode;
}

export const CustomTable = ({
  rows,
  onEdit,
  columns,
  onDelete,
  isLoading,
  children,
}: CustomTableProps) => {
  return (
    <Paper sx={{ bgcolor: "secondary.main", width: "100%" }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              {columns.map(({ id, label }) => (
                <TableCell key={id} sx={{ fontWeight: "bold" }}>
                  {label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isLoading &&
              rows.map((row) => (
                <TableRow
                  key={row["user_id"]}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>{value ?? "N/A"}</TableCell>
                    );
                  })}
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton color="info" onClick={() => onEdit(row)}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={() => onDelete(row)}>
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && rows.length <= 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {children}
    </Paper>
  );
};
