import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { GridContainer } from "../elements/GridContainer";

interface aboutProps {}

const about: React.FC<aboutProps> = ({}) => {
  return (
    <GridContainer width="100%" height="100%">
      <Box gridColumn="content-begin / content-end">
        <Heading
          textAlign="center"
          background="mainGradient"
          backgroundClip="text"
          css={{ "-webkit-text-fill-color": "transparent" }}
          fontSize={["1.75rem", null, "2.5rem", null, "3.5rem"]}
        >
          A developer and a life-long student
        </Heading>
      </Box>
    </GridContainer>
  );
};

export default about;
