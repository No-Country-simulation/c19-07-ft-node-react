import { type ChangeEvent, useState } from "react";

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
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

interface CustomTableProps {
  rows: any[];
  columns: { id: string; label: string }[];
  isLoading: boolean;
  totalCount?: number;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

export const CustomTable = ({
  rows,
  onEdit,
  columns,
  onDelete,
  isLoading,
  totalCount,
}: CustomTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
                      <IconButton
                        color="error"
                        sx={{ marginLeft: 1 }}
                        onClick={() => onDelete(row)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalCount ?? rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
