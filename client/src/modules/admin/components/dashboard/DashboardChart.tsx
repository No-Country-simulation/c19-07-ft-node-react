import "chart.js/auto";
import { Bar } from "react-chartjs-2";
// import type { ChartData } from "chart.js/auto";

import { TopStudent } from "../../interfaces";
import { Box } from "@mui/material";

const colors = ["#87CEEB", "#98FB98", "#FF7F50", "#FFD700", "#B1B1FF"];

interface DashboardChartProps {
  topStudents: TopStudent[];
}

export const DashboardChart = ({ topStudents }: DashboardChartProps) => {
  // const labels = topStudents.map(
  //   ({ name, grade, section }) => `${name} - ${grade}${section}`
  // );

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Results",
  //       data: topStudents.map((student) => +student.averageMark),
  //       backgroundColor: colors,
  //       borderColor: colors,
  //     },
  //   ],
  // };

  const data = {
    labels: [""],
    datasets: topStudents.map((student, index) => ({
      label: `${student.name} - ${student.grade}${student.section}`,
      data: [+student.averageMark],
      backgroundColor: colors[index],
      borderColor: colors[index],
    })),
  };

  console.log(data);

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
