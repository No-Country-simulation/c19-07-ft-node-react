import {
  Box,
  Chip,
  List,
  Stack,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";

import { OverviewData } from "../../interfaces";
import { generateRandomColor } from "../../utils";

import { CustomCard } from "../ui/CustomCard";
import { EvaluationResultsChart } from "./EvaluationResultsChart";
import { Comment } from "@mui/icons-material";

const periods: Record<string, string> = {
  PRIMER_PERIODO: "1st Period",
  SEGUNDO_PERIODO: "2nd Period",
  TERCER_PERIODO: "3rd Period",
  CUARTO_PERIODO: "4th Period",
};

interface OverviewProps {
  parentView?: boolean;
  overviewData: OverviewData;
}

export const Overview = ({ parentView, overviewData }: OverviewProps) => {
  const { courses, infoStudent, evaluationsByPeriod, overallAverageByPeriod } =
    overviewData;

  const gradeTopText = parentView ? "Grade" : "My grade";
  const gradeSubheading = `Student: ${infoStudent.name}`;

  const overallAverage = overallAverageByPeriod[0].average.toFixed(2);
  const currentPeriod = `Corresponds to the ${
    periods[overallAverageByPeriod[0].period]
  }`;

  const evaluationSubheading = `Rating obtained in the last ${evaluationsByPeriod[0].evaluations.length} evaluations of the current period`;

  const coursesHeading = parentView ? "Courses" : "My courses";
  const coursesSubheading = parentView
    ? "Courses my child is enrolled in"
    : "Courses I'm enrolled in";

  const feedbackSubheading = parentView
    ? "What teachers say about son my performance..."
    : "What teachers say about my performance...";
  const comments = evaluationsByPeriod[0].evaluations.map(
    (ev) => ev.evaluationResult.coment
  );

  return (
    <Box
      height={{ sm: "100%" }}
      width="100%"
      display="flex"
      flexDirection="column"
      gap={2}
    >
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
            heading={`${infoStudent.grade}${infoStudent.section}`}
            headingVariant="h2"
            topText={gradeTopText}
            subHeading={gradeSubheading}
            sx={{
              width: "100%",
              height: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          />

          <CustomCard
            heading={overallAverage}
            headingVariant="h2"
            topText="Overall average"
            subHeading={currentPeriod}
            sx={{
              width: "100%",
              height: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          />
        </Box>

        <CustomCard
          heading="Period Evaluations"
          headingVariant="h5"
          subHeading={evaluationSubheading}
          sx={{ width: { md: "70%" } }}
        >
          <EvaluationResultsChart
            evaluations={evaluationsByPeriod[0].evaluations}
          />
        </CustomCard>
      </Box>

      <Box
        height={{ md: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <CustomCard
          heading={coursesHeading}
          headingVariant="h5"
          subHeading={coursesSubheading}
          sx={{ width: { sm: "50%" }, height: "100%" }}
        >
          <Stack
            mt={2}
            gap={2}
            height="100%"
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="center"
          >
            {courses.map(({ name }, index) => (
              <Chip
                key={index}
                label={name}
                sx={{
                  p: 4,
                  color: "white",
                  fontSize: "2rem",
                  bgcolor: generateRandomColor(),
                }}
              />
            ))}
          </Stack>
        </CustomCard>

        <CustomCard
          heading="Overall Feedback"
          headingVariant="h5"
          subHeading={feedbackSubheading}
          sx={{ width: { sm: "50%" }, overflow: "auto" }}
        >
          <List sx={{ overflow: "auto" }}>
            {comments.map((comment, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <ListItemText
                    primary={comment}
                    sx={{ fontStyle: "italic" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CustomCard>
      </Box>
    </Box>
  );
};
