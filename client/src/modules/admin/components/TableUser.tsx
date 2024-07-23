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

type AlignType = "left" | "right" | "center";

const headers: { name: string; align: AlignType }[] = [
  { name: "No.", align: "left" },
  { name: "Full Name", align: "left" },
  { name: "User Type", align: "left" },
  { name: "Telephone", align: "left" },
];

const dummyData = [
  {
    id: "1",
    full_name: "Juan Pérez",
    user_type: "PROFESSOR",
    telephone: "123-456-7890",
  },
  {
    id: "2",
    full_name: "Ana Gómez",
    user_type: "PARENTS",
    telephone: "987-654-3210",
  },
];

const TableUser = () => {
  const navigate = useNavigate();

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
                      {dummyData.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ color: "black", fontWeight: "bold" }}
                          >
                            {item.full_name}
                          </TableCell>
                          <TableCell align="left" sx={{ color: "black" }}>
                            {item.user_type}
                          </TableCell>
                          <TableCell align="left" sx={{ color: "black" }}>
                            {item.telephone}
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
