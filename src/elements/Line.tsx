import { Box } from "@chakra-ui/react";
import React from "react";

export const Line: React.FC<{ dotPos: "top" | "bottom" }> = ({ dotPos }) => {
  return (
    <>
      <Box h="290px" w="2px" bg="white" />
      <Box
        bg="white"
        w="10px"
        h="10px"
        pos="absolute"
        bottom={dotPos === "bottom" ? 0 : "100%"}
        left="50%"
        transformOrigin="left bottom"
        transform="rotate(45deg) translateX(-50%) translateY(50%)"
      />
    </>
  );
};
