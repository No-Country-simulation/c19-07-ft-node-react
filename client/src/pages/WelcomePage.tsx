import { Box, Typography } from "@mui/material";

import books from "../assets/images/books.png";
import chalkboardBg from "../assets/images/chalkboard-bg.jpg";

import { useAuthStore } from "../hooks";

export default function WelcomePage() {
  const { user } = useAuthStore();

  return (
    <Box
      p={2}
      width="100%"
      height="100%"
      border={2}
      borderColor="#001E1D"
      bgcolor="#8B4513"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100%"
        border={2}
        borderColor="#001E1D"
        bgcolor="primary.main"
        sx={{
          backgroundImage: `url(${chalkboardBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Typography
          px={2}
          position="relative"
          variant="h2"
          fontFamily="Crayon"
          fontSize={{
            xs: "45px",
            sm: "55px",
            md: "65px",
            lg: "75px",
            xl: "95px",
          }}
          textAlign="center"
          color="white"
          sx={{ userSelect: "none" }}
        >
          Welcome Back {user?.name}
        </Typography>
        <Box
          width={{ xs: "100px", sm: "120px", md: "150px" }}
          height={{ xs: "100px", sm: "120px", md: "150px" }}
          position="absolute"
          bottom={0}
          right={0}
          sx={{
            backgroundImage: `url(${books})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
      </Box>
    </Box>
  );
}
