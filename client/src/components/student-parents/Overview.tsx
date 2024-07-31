import { Box } from "@mui/material";

import { CustomCard } from "../ui/CustomCard";
import { EvaluationResultsChart } from "./EvaluationResultsChart";

interface OverviewProps {
  view: "student" | "parents";
  // courses?: any;
  // gradeSection?: string;
  // overallAverage?: number;
  // overallFeedback?: string;
  // evaluationResults?: any;
}

export const Overview = ({
  view,
  // overallFeedback,
}: OverviewProps) => {
  const feedbackSubheading =
    view === "student"
      ? "What teachers say about my performance..."
      : "What teachers say about son my performance...";

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
          <CustomCard
            heading="5A"
            headingVariant="h1"
            topText="My course"
            subHeading="Currently in 5° in section A"
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
        <CustomCard
          heading="My courses"
          subHeading={feedbackSubheading}
          sx={{ width: "100%" }}
        ></CustomCard>
        <CustomCard heading="General Feedback" sx={{ width: "100%" }}>
          {/* {overallFeedback} */}
        </CustomCard>
      </Box>
    </Box>
  );
};
