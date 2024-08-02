import "chart.js/auto";
import { Pie } from "react-chartjs-2";

import { Box } from "@mui/material";
import { Evaluation } from "../../interfaces";

const colors = [
  "#FF7F7F", // Soft Red
  "#FFB27F", // Soft Orange
  "#FFF47F", // Soft Yellow
  "#7FFF9F", // Soft Green
  "#7FD4FF", // Soft Blue
  "#B27FFF", // Soft Violet
  "#FF7FB2", // Bright Pink
  "#FFA77F", // Soft Coral
];

interface EvalutionResultsChartProps {
  evaluations: Evaluation[];
}

export const EvaluationResultsChart = ({
  evaluations,
}: EvalutionResultsChartProps) => {
  const data = {
    labels: evaluations.map((ev) => ev.nameEvaluation),
    datasets: [
      {
        data: evaluations.map((ev) => ev.evaluationResult.mark),
        backgroundColor: evaluations.map((_, i) => colors[i]),
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="auto"
      mt={2}
      overflow="scroll"
    >
      <Pie data={data} style={{ height: "auto", maxHeight: "300px" }} />
    </Box>
  );
};
