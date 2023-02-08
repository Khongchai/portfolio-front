import { Box } from "@chakra-ui/react";
import React from "react";
import useHoverComponent from "../../utils/useHoverComponent";

export const TechNameCard: React.FC<{ hoveredComponentName: string }> = ({
  hoveredComponentName,
}) => {
  useHoverComponent(hoveredComponentName);

  return (
    <Box
      zIndex="100"
      backgroundColor="white"
      p={3}
      left="-1000px"
      id="info-card"
      position="fixed"
      borderRadius={4}
      boxSizing="content-box"
      pointerEvents="none"
      transform="translateX(-50%)"
      color="black"
      fontWeight="bold"
    >
      {/* Remove the unique mark # from the hoveredComponent */}
      {hoveredComponentName.split("#")[0]}
    </Box>
  );
};
