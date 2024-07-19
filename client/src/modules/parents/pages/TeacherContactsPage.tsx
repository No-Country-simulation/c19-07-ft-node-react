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

import {  Professor } from "../../../interfaces";
import { useAxiosPrivate } from "../../../hooks";

export default function TeacherContactsPage() {
  const navigate = useNavigate();
  const api = useAxiosPrivate();
  const [professors, setProfessors] = useState<Professor[]>([]);

  useEffect(() => {api.get<Professor[]>("/professors").then((res) => {
      setProfessors(res.data);
      console.log("---->",res.data);

    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Teacher</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {professors!.map((professor) => (
            <TableRow
              key={professor.professor_id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => {
                navigate("/professors/chat");
                console.log(professor);
              }}
            >
              <TableCell component="th" scope="row">
                {professor.professor_id}
              </TableCell>
              {/* <TableCell align="right">{row.calories}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
