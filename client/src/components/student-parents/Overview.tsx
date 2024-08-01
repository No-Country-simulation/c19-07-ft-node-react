import { Box } from "@mui/material";

import { CustomCard } from "../ui/CustomCard";
import { EvaluationResultsChart } from "./EvaluationResultsChart";

interface OverviewProps {
  parentView?: boolean;
  studentName?: string;
  courses?: any;
  grade?: string;
  section?: string;
  overallAverage?: number;
  overallFeedback?: string;
  evaluationResults?: any;
}

export const Overview = ({ parentView, studentName }: OverviewProps) => {
  const gradeTopText = parentView ? "Grade" : "My grade";
  const gradeSubheading = "Currently in 5°, section A";

  const coursesHeading = parentView ? "Courses" : "My courses";
  const coursesSubheading = parentView
    ? "Courses my child is enrolled in"
    : "Courses I'm enrolled in";

  const feedbackSubheading = parentView
    ? "What teachers say about son my performance..."
    : "What teachers say about my performance...";

  return (
    <Box height="100%" display="flex" flexDirection="column" gap={2}>
      <Box
        height={{ md: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap={2}
      >
        <Box
          width={{ md: "30%" }}
          display="flex"
          flexDirection={{ xs: "column", sm: "row", md: "column" }}
          gap={2}
        >
          {parentView && (
            <CustomCard heading={studentName} headingVariant="h5" />
          )}

          <CustomCard
            heading="5A"
            headingVariant="h1"
            topText={gradeTopText}
            subHeading={gradeSubheading}
            sx={{ width: "100%", height: "100%" }}
          />

          <CustomCard
            heading="8.5"
            headingVariant="h1"
            topText="Overall average"
            subHeading="Current period: 3"
            sx={{ width: "100%", height: "100%" }}
          />
        </Box>

        <CustomCard
          heading="Period Evaluations"
          headingVariant="h5"
          subHeading="Rating obtained in the last 5 evaluations of the current period"
          sx={{ width: { md: "70%" } }}
        >
          <EvaluationResultsChart />
        </CustomCard>
      </Box>

      <Box
        height={{ md: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        {/* un despleglabe por cada area academica (adentro los cursos) o una lista */}
        <CustomCard
          heading={coursesHeading}
          headingVariant="h5"
          subHeading={coursesSubheading}
          sx={{ width: "100%" }}
        ></CustomCard>
        {/* carousel o background image */}
        <CustomCard
          heading="Overall Feedback"
          headingVariant="h5"
          subHeading={feedbackSubheading}
          sx={{ width: "100%" }}
        >
          {/* {overallFeedback} */}
        </CustomCard>
      </Box>
    </Box>
  );
};
