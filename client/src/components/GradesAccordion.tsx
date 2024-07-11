import {Box, Accordion, AccordionSummary, AccordionDetails, Divider } from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function GradesAccordion() {
  return (
    <>
    <Accordion sx={{backgroundColor: "#ABD1C6", color:"black"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span style={{ fontWeight: "bold" }}>Grades</span>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>Matemáticas</Box>
            <Box>2</Box>
          </Box>
          <Divider />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
