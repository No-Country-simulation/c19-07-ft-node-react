import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

import { ParentAreaChart, StudientGradesAccordion } from "../../components";

export default function YourComponent() {
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "red",
      }}
    >
      <StudientGradesAccordion/>
      <ParentAreaChart />
      
    </Box>
  );
}
