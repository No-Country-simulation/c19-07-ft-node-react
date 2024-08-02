import { Box } from "@mui/material";

import { Doughnut } from "react-chartjs-2";
import { generateRandomColor } from "../../utils";

interface DoughnutChartProps {
  evaluations: any;
}

export const DoughnutChart = ({ evaluations }: DoughnutChartProps) => {
  const ranges = [5, 10, 15, 20];
  const rangeLabels = ["1-5", "6-10", "11-15", "16-20"];
  const distribution = new Array(rangeLabels.length).fill(0);

  evaluations.forEach((ev: any) => {
    const mark = ev.evaluationResult.mark;
    ranges.forEach((range, index) => {
      if (mark <= range) {
        distribution[index]++;
        return false;
      }
    });
  });

  const data = {
    labels: rangeLabels,
    datasets: [
      {
        data: distribution,
        backgroundColor: [
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
          generateRandomColor(),
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={2}
    >
      <Doughnut data={data} style={{ maxHeight: "200px" }} />
    </Box>
  );
};
