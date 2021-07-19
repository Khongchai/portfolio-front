import { Box, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { WhiteStrokedHeader } from "../shared/WhiteStrokedHeader";
import { ResumeInfo } from "./ResumeInfo";

const ResumeSection: React.FC = ({}) => {
  return (
    <Box>
      <Box mb="2rem">
        <WhiteStrokedHeader>Resume</WhiteStrokedHeader>
      </Box>
      <Flex
        justifyContent="space-between"
        flexDir={["column", null, null, "row"]}
      >
        <Box flex="0.2" display={["none", null, null, "block"]}>
          <StaticImage
            id="khong-image"
            src="../../images/khong-banner.png"
            alt="Author's image"
            layout="constrained"
            placeholder="blurred"
          />
        </Box>
        <Box flex="0.7">
          <ResumeInfo />
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(ResumeSection) as React.FC;
