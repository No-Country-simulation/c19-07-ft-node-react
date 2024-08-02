import { Box } from "@mui/material";

import { Bar } from "react-chartjs-2";

interface BarChartProps {
  data: any;
}

export const BarChart = ({ data }: BarChartProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={2}
    >
      <Bar data={data} style={{ maxHeight: "200px" }} />
    </Box>
  );
};
