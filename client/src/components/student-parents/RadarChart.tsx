import { Box } from "@mui/material";

import { Radar } from "react-chartjs-2";

interface RadarChartProps {
  data: any;
}

export const RadarChart = ({ data: { labels, datasets } }: RadarChartProps) => {
  const data = {
    labels: labels,
    datasets: datasets.map((dataset: any) => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor.replace("0.2", "0.2"),
      pointBackgroundColor: dataset.borderColor,
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
      <Radar data={data} style={{ maxHeight: "200px", maxWidth: "300px" }} />
    </Box>
  );
};
