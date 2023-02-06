import { Box } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export const Chevron: React.FC<{
  direction: string;
  onClickFunction: () => void;
  hide: boolean;
}> = ({ direction, onClickFunction, hide }) => {
  const transform = direction === "right" ? "rotate(90deg)" : "rotate(-90deg)";
  return (
    <Box
      onClick={() => {
        onClickFunction();
      }}
      display={hide ? "none" : "block"}
      transform={transform}
      position="absolute"
      zIndex="9999"
      left={direction === "left" ? "-2%" : "100%"}
      transition=".12s"
      cursor="pointer"
      maxWidth={"30px"}
      width="100%"
      _hover={{ transform: `${transform} scale(1.3)` }}
    >
      <StaticImage
        src="../../images/chevron_up.svg"
        alt="chevron-right"
        style={{ filter: "invert(1)" }}
      />
    </Box>
  );
};
