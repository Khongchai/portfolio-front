import { Box } from "@chakra-ui/react";
import React from "react";

export const Line: React.FC = ({}) => {
  return (
    <>
      <Box h="290px" w="2px" bg="white" />
      <Box
        bg="white"
        w="10px"
        h="10px"
        pos="absolute"
        bottom="0"
        left="50%"
        transformOrigin="left bottom"
        transform="rotate(45deg) translateX(-50%) translateY(50%)"
      />
    </>
  );
};
