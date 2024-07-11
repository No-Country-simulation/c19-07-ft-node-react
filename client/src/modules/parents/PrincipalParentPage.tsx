import { Box } from "@mui/material";

import {
  ParentAreaChart,
  StudientGradesAccordion,
  TeacherFeedback,
} from "../../components";

export default function YourComponent() {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <StudientGradesAccordion />
      <ParentAreaChart />
      <TeacherFeedback />
    </Box>
  );
}
