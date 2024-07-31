import { Box } from "@mui/material";
import { CustomCard } from "../ui/CustomCard";

export const Performance = () => {
  /* Mostrar el rendimiento de 4 formas distintas */
  /* Una tabla simple con las notas de cada materia */
  /* Feedback general */
  /* Un grafico con las notas de los últimos parciales */

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard sx={{ width: "100%" }}></CustomCard>
        <CustomCard sx={{ width: "100%" }}></CustomCard>
      </Box>

      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard sx={{ width: "100%" }}></CustomCard>
        <CustomCard sx={{ width: "100%" }}></CustomCard>
      </Box>
    </Box>
  );
};
