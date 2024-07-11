import { Box, Typography } from "@mui/material";

import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Box p={2}>
      <Box
        sx={{
          backgroundImage: { xs: "url(/school-metrics.svg)" },
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%",
          height: "39px",
        }}
        display="flex"
        justifyContent="center"
        mb={2}
      ></Box>

      <Typography
        variant="h5"
        textAlign="center"
        fontWeight="bold"
        marginBottom={4}
      >
        Login
      </Typography>

      <LoginForm />
    </Box>
  );
}
