import { useEffect, useState } from "react";

import { Box, Skeleton } from "@mui/material";

import { useAxiosPrivate } from "../../../hooks";

import { DashboardChart } from "../components";
import { CustomCard } from "../../../components";
import { DashboardData, DashboardResponse } from "../interfaces";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export default function AdminDashboardPage() {
  const api = useAxiosPrivate();
  const [dashboardData, setDashboardData] = useState<DashboardData | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await delay(2000);

        const resp = await api.get<DashboardResponse>("/admin/dashboard");

        if (resp.data.success) {
          setDashboardData(resp.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
          heading={dashboardData?.overallAverage.toFixed(2)}
          headingVariant="h2"
        />
        <CustomCard
          sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
          topText="Active Students"
          heading={dashboardData?.activeStudents}
          headingVariant="h2"
        />
        <CustomCard
          sx={{ width: "100%", textAlign: { xs: "center", sm: "left" } }}
          topText="No. of Teachers"
          heading={dashboardData?.numberOfTeachers}
          headingVariant="h2"
        />
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
          {dashboardData ? (
            <DashboardChart topStudents={dashboardData.topStudents} />
          ) : (
            <Skeleton variant="rounded" height="100%" sx={{ mt: 2 }} />
          )}
        </CustomCard>
      </Box>
    </Box>
  );
}
