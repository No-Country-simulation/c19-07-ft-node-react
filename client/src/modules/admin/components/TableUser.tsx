import { useState, useEffect } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks";

type AlignType = "left" | "right" | "center";

const headers: { name: string; align: AlignType }[] = [
  { name: "No.", align: "left" },
  { name: "name", align: "left" },
  { name: "type_user", align: "left" },
  { name: "email", align: "left" },
];

interface User  {
  id: string;
  name: string;
  type_user: string; 
  email: string;
}


const TableUser = () => {
  const api = useAxiosPrivate()
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>(`/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };

    fetchUsers();
  }, [api]);

  const handleAddUser = () => {
    navigate("/newUser");
  };

  return (
    <>
      <Typography>Users</Typography>
      <Container disableGutters>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginTop: "2vh",
                    marginBottom: "2vh",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddUser}
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: "#e16162",
                      },
                    }}
                  >
                    New User
                  </Button>
                </Grid>
                <TableContainer component={Paper}>
                  <Table
                    sx={{ minWidth: 650, backgroundColor: "#f9bc60" }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableCell
                            key={header.name}
                            align={header.align}
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {header.name}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user, index) => (
                        <TableRow key={user.id}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {user.name}
                          </TableCell>
                          <TableCell align="left" sx={{ color: "black" }}>
                            {user.type_user}
                          </TableCell>
                          <TableCell align="left" sx={{ color: "black" }}>
                            {user.email}
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ display: "flex", justifyContent: "flex-end" }}
                          >
                            <IconButton
                              sx={{
                                color: "black",
                                "&:hover": { backgroundColor: "#e16162" },
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              sx={{
                                color: "black",
                                "&:hover": { backgroundColor: "#e16162" },
                                marginLeft: 1,
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default TableUser;
