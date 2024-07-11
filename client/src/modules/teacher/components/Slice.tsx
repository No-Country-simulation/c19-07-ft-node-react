import { Box, Container, } from "@mui/material";

const Slice = () => {
  return (
    <Container disableGutters sx={{padding:0}}>
      <Box
        sx={{
          backgroundColor: "#f9bc60",
          //borderRadius: "20px",
          height: { xs: "15vh", sm: "30vh", md: "40vh", lg: "40vh" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            fontSize: "50px",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Slice
        </Box>
      </Box>
    </Container>
  );
};

export default Slice;
