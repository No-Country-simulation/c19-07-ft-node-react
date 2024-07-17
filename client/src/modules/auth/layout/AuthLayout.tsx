import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";

import shape1 from "../../../assets/svgs/shape-decorator-1.svg";
import shape2 from "../../../assets/svgs/shape-decorator-2.svg";

export default function AuthLayout() {
  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      bgcolor="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        bgcolor="background.default"
        position="fixed"
        top={0}
        zIndex={2}
        width="100%"
        height="15px"
      />

      <Box
        width="350px"
        display="flex"
        bgcolor="white"
        padding={3}
        my={8}
        mx={2}
        zIndex={1}
        borderRadius={2}
        boxShadow="0px 8px 24px rgba(149, 157, 165, 0.2)"
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          backgroundImage: { xs: `url(${shape1})` },
          backgroundRepeat: "no-repeat",
          width: "430px",
          height: "116px",
        }}
        position="fixed"
        bottom={0}
        left={0}
      ></Box>

      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          backgroundImage: { xs: `url(${shape2})` },
          backgroundRepeat: "no-repeat",
          width: "359px",
          height: "83px",
        }}
        position="fixed"
        bottom={0}
        right={0}
      ></Box>
    </Box>
  );
}
