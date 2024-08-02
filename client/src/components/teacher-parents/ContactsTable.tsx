import {
  Paper,
  Table,
  TableRow,
  Skeleton,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

interface ContactsTableProps {
  rows: any[];
  heading: string;
  isLoading: boolean;
  onClickRow: (row: any) => void;
}

export const ContactsTable = ({
  rows,
  heading,
  isLoading,
  onClickRow,
}: ContactsTableProps) => {
  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ position: "sticky", top: 0, bgcolor: "white" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              {heading}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading &&
            rows.map((row) => (
              <TableRow
                key={row.user_id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#eeeeee" },
                  "&:active": { backgroundColor: "#e1e1e1" },
                  transition: "all .3s ease-out",
                  cursor: "pointer",
                }}
                onClick={() => onClickRow(row)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
              </TableRow>
            ))}
          {isLoading &&
            Array.from({ length: 15 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
