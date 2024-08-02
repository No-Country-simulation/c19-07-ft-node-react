import { Box, Skeleton } from "@mui/material";

import { CustomCard } from "../ui/CustomCard";

interface OverviewSkeletonProps {
  parentView?: boolean;
}

export const OverviewSkeleton = ({ parentView }: OverviewSkeletonProps) => {
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
          {parentView && (
            <CustomCard
              sx={{ width: "100%", height: { xs: "auto", md: "40%" } }}
            >
              <Skeleton variant="rounded" height="100%" />
            </CustomCard>
          )}

          <CustomCard
            sx={{
              width: "100%",
              height: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Skeleton variant="rounded" height="100%" />
          </CustomCard>

          <CustomCard
            sx={{
              width: "100%",
              height: "100%",
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Skeleton variant="rounded" height="100%" />
          </CustomCard>
        </Box>

        <CustomCard sx={{ width: { md: "70%" } }}>
          <Skeleton variant="rounded" height="100%" />
        </CustomCard>
      </Box>

      <Box
        height={{ md: "50%" }}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <CustomCard sx={{ width: { sm: "50%" }, height: "100%" }}>
          <Skeleton variant="rounded" height="100%" />
        </CustomCard>

        <CustomCard sx={{ width: { sm: "50%" } }}>
          <Skeleton variant="rounded" height="100%" />
        </CustomCard>
      </Box>
    </Box>
  );
};
