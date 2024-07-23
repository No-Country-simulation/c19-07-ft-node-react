import { Box, Typography } from "@mui/material";

import { useAuthStore } from "../hooks";

export default function WelcomePage() {
  const { user } = useAuthStore();

  return (
    <Box>
      <Typography fontFamily="Crayon">Welcome back <Typography>,</Typography> {user?.name}</Typography>
    </Box>
  );
}
