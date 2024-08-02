import "chart.js/auto";
import { Bar } from "react-chartjs-2";

import { Box } from "@mui/material";

import { TopStudent } from "../../interfaces";

const colors = ["#87CEEB", "#98FB98", "#FF7F50", "#FFD700", "#B1B1FF"];

interface DashboardChartProps {
  topStudents: TopStudent[];
}

export const DashboardChart = ({ topStudents }: DashboardChartProps) => {
  const data = {
    labels: [""],
    datasets: topStudents.map((student, index) => ({
      label: `${student.name} - ${student.grade}${student.section}`,
      data: [+student.averageMark],
      backgroundColor: colors[index],
      borderColor: colors[index],
    })),
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      mt={2}
      px={{ md: 10 }}
    >
      <Bar data={data} style={{ maxHeight: "500px" }} />
    </Box>
  );
};
