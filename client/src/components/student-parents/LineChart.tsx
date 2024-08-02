import { Box } from "@mui/material";

import { Line } from "react-chartjs-2";

interface LineChartProps {
  data: any;
}

export const LineChart = ({ data: { labels, datasets } }: LineChartProps) => {
  const data = {
    labels: labels,
    datasets: datasets.map((dataset: any) => ({
      ...dataset,
      fill: false,
      tension: 0.1,
    })),
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={2}
    >
      <Line data={data} style={{ maxHeight: "200px" }} />
    </Box>
  );
};
