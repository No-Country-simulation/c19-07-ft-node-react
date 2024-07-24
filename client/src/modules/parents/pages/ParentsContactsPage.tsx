import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";

import { Professor } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

export default function ParentsContactsPage() {
  const navigate = useNavigate();
  const api = useAxiosPrivate();
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {
    api.get<Professor[]>("/professors").then((res) => {
      setProfessors(res.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teachers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors!.map((professor) => (
            <TableRow
              key={professor.user_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                navigate(`/parents/chat/${professor.user_id}`);
                console.log(professors);
              }}
            >
              <TableCell component="th" scope="row">
                {professor.user_id}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
