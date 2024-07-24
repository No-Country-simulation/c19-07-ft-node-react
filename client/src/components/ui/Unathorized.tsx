import { useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

import { LockIcon } from "../icons/LockIcon";

export const Unathorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        px={3}
      >
        <LockIcon style={{ width: "80px", height: "80px", color: "#fffffe" }} />

        <Typography
          variant="h1"
          fontSize="40px"
          fontWeight="bold"
          textAlign="center"
          color="#fffffe"
        >
          Unauthorized
        </Typography>

        <Typography textAlign="center" color="#e8e4e6">
          You are not authorized to view this page.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowBackOutlined />}
          onClick={goBack}
        >
          <Typography textTransform="capitalize" fontWeight="bold">
            Go Back
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
