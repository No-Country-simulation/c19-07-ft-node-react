import { Card, Typography, CardContent, Box } from "@mui/material";
import type { PropsWithChildren } from "react";

type CustomCardProps = PropsWithChildren & {
  bgcolor?: string;
  topText?: string;
  heading?: string;
  subHeading?: string;
  headingVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const CustomCard = ({
  bgcolor,
  topText,
  heading,
  children,
  subHeading,
  headingVariant,
}: CustomCardProps) => {
  return (
    <Card sx={{ bgcolor: bgcolor ? bgcolor : "#e8e4e6" }}>
      <CardContent>
        {topText && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {topText}
          </Typography>
        )}
        {heading && (
          <Typography
            variant={headingVariant ? headingVariant : "h6"}
            component="div"
          >
            {heading}
          </Typography>
        )}
        {subHeading && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {subHeading}
          </Typography>
        )}

        <Box>{children}</Box>
      </CardContent>
    </Card>
  );
};
