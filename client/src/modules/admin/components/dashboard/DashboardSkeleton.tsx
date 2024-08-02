import { Box, Skeleton } from "@mui/material";
import { CustomCard } from "../../../../components";

export const DashboardSkeleton = () => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        gap={2}
      >
        <CustomCard
          sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
          topText="Overall Cumulative Average"
        >
          <Skeleton variant="rounded" height="72px" />
        </CustomCard>

        <CustomCard
          sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
          topText="Active Students"
        >
          <Skeleton variant="rounded" height="72px" />
        </CustomCard>

        <CustomCard
          sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
          topText="No. of Teachers"
        >
          <Skeleton variant="rounded" height="72px" />
        </CustomCard>
      </Box>

      <Box height="100%" mt={2}>
        <CustomCard
          sx={{
            height: "100%",
            position: "relative",
            textAlign: { xs: "center", sm: "left" },
          }}
          heading="Top 5 Students"
          headingVariant="h5"
        >
          <Skeleton variant="rounded" height="100%" sx={{ mt: 2 }} />
        </CustomCard>
      </Box>
    </Box>
  );
};
