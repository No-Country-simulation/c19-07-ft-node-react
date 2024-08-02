import { Link } from "react-router-dom";

import { HomeOutlined } from "@mui/icons-material";
import { Box, Typography, Button } from "@mui/material";

import { CompassIcon } from "../components";

export default function NotFoundPage() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={3}
        px={3}
      >
        <CompassIcon
          style={{ width: "100px", height: "100px", color: "#fffffe" }}
        />

        <Typography
          variant="h1"
          fontSize="50px"
          fontWeight="bold"
          textAlign="center"
          color="#fffffe"
        >
          Page Not Found
        </Typography>

        <Typography textAlign="center" color="#e8e4e6" maxWidth={{ sm: "70%" }}>
          The page you're looking for doesn't seem to exist. Check the URL or
          try navigating back to the homepage.
        </Typography>

        <Link to="/">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<HomeOutlined />}
          >
            <Typography textTransform="capitalize" fontWeight="bold">
              Go to Homepage
            </Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
