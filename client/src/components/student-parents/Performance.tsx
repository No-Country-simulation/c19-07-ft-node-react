import { Box } from "@mui/material";
import { CustomCard } from "../ui/CustomCard";

interface PerformanceProps {
  view: "student" | "parents";
}

export const Performance = () => {
  /*
  * 1. Promedio por periodo => promedio final
  * 2. Notas generales de cada curso (materia)
  * 3. Resultados de evaluciones => últimas 10 resultados de evaluaciones
  * 4. feedback específico de cada curso (materia)
  */

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard heading="" sx={{ width: "100%" }}></CustomCard>
        <CustomCard heading="" sx={{ width: "100%" }}></CustomCard>
      </Box>

      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard heading="" sx={{ width: "100%" }}></CustomCard>
        <CustomCard heading="" sx={{ width: "100%" }}></CustomCard>
      </Box>
    </Box>
  );
};
