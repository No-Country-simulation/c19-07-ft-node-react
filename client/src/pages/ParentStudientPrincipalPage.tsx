import { Box } from "@mui/material";

import {
  StudientAreaChart,
  GradesAccordion,
  TeacherFeedback,
} from "../components";

export const ParentStudientPrincipalPage = () => {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <GradesAccordion />
      <StudientAreaChart />
      <TeacherFeedback />
    </Box>
  );
}
