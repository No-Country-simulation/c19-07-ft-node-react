import { Box } from "@mui/material";

import { CustomCard } from "../ui/CustomCard";
import { Evaluation } from "../../interfaces";
import { generateRandomColor } from "../../utils";

import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { RadarChart } from "./RadarChart";
import { DoughnutChart } from "./DoughnutChart";

interface PerformanceProps {
  evaluations: Evaluation[];
}

export const Performance = ({ evaluations }: PerformanceProps) => {
  const courses: Record<string, { name: string; evaluations: any[] }> = {};

  evaluations.forEach((ev) => {
    const { courseId, nameCourse, nameEvaluation, evaluationResult } = ev;
    if (!courses[courseId]) {
      courses[courseId] = {
        name: nameCourse,
        evaluations: [],
      };
    }
    courses[courseId].evaluations.push({
      name: nameEvaluation,
      mark: evaluationResult.mark,
    });
  });

  const labels = [...new Set(evaluations.map((e) => e.nameEvaluation))];

  const datasets = Object.values(courses).map((course) => {
    const data = labels.map((label) => {
      const evaluation = course.evaluations.find((e) => e.name === label);
      return evaluation ? evaluation.mark : null;
    });
    return {
      label: course.name,
      data: data,
      backgroundColor: generateRandomColor(),
      borderWidth: 1,
    };
  });

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <Box height={{ md: "100%" }} display="flex" flexDirection="column" gap={2}>
      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard
          heading="Grading Progress"
          headingVariant="h5"
          sx={{ width: "100%" }}
        >
          <LineChart data={data} />
        </CustomCard>

        <CustomCard
          heading=" Global Evaluation by Course"
          sx={{ width: "100%" }}
        >
          <RadarChart data={data} />
        </CustomCard>
      </Box>

      <Box
        height={{ sm: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <CustomCard
          heading="Distribution of Grades by Evaluation"
          sx={{ width: "100%" }}
        >
          <DoughnutChart evaluations={evaluations} />
        </CustomCard>

        <CustomCard
          heading="Evalutions by Course"
          headingVariant="h5"
          sx={{ width: "100%" }}
        >
          <BarChart data={data} />
        </CustomCard>
      </Box>
    </Box>
  );
};
