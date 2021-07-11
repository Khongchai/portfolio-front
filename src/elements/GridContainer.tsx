import { Grid, ResponsiveValue, Stack } from "@chakra-ui/react";
import React from "react";

interface GridContainerProps {
  width: string;
  height: string;
  padding?: string;
  position?: any;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  width,
  height,
  children,
  padding,
  position,
}) => {
  return (
    <Grid
      w={width}
      h={height}
      position={position ? position : "relative"}
      padding={padding ? padding : 0}
      gridTemplateColumns={[
        `
        0.5fr [content-begin] repeat(12, 0.6fr) [content-end] 0.5fr
        `,
        null,
        null,
        "1fr [content-begin] repeat(12, 0.6fr) [content-end] 1fr",
        ,
      ]}
    >
      {children}
    </Grid>
  );
};
