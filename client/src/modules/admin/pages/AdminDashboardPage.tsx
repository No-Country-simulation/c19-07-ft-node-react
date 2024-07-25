import { Grid } from "@mui/material";

import { CustomCard } from "../../../components";
import { DashboardChart } from "../components";

export default function AdminDashboardPage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <CustomCard
          topText="Overall Cumulative Average"
          heading="3.5"
          headingVariant="h2"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CustomCard
          topText="Overall Cumulative Average"
          heading="3.5"
          headingVariant="h2"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <CustomCard
          topText="Overall Cumulative Average"
          heading="3.5"
          headingVariant="h2"
        />
      </Grid>
      <Grid item xs={12}>
        <CustomCard heading="Some Chart">
          <DashboardChart />
        </CustomCard>
      </Grid>
    </Grid>
  );
}
