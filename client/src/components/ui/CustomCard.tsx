import type { PropsWithChildren } from "react";

import {
  // Box,
  Card,
  Typography,
  CardContent,
  type SxProps,
  type Theme,
  Skeleton,
} from "@mui/material";

type CustomCardProps = PropsWithChildren & {
  sx?: SxProps<Theme>;
  topText?: string;
  heading?: string | number;
  subHeading?: string;
  headingVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const CustomCard = ({
  sx = { bgcolor: "#e8e4e6" },
  topText,
  heading,
  children,
  subHeading,
  headingVariant,
}: CustomCardProps) => {
  return (
    <Card sx={sx}>
      <CardContent
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        {topText && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {topText}
          </Typography>
        )}
        {heading ? (
          <Typography
            variant={headingVariant ? headingVariant : "h6"}
            component="div"
          >
            {heading}
          </Typography>
        ) : (
          <Skeleton variant="rounded" height="72px" />
        )}
        {subHeading && (
          <Typography color="text.secondary">
            {subHeading}
          </Typography>
        )}

        {children}
      </CardContent>
    </Card>
  );
};
