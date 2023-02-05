import { Box, Flex } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { ResumeDownloadSection } from "../ResumeDownloadSection";
import { WhiteStrokedHeader } from "../shared/WhiteStrokedHeader";
import { ResumeInfo } from "./ResumeInfo";

const ResumeSection: React.FC = ({ }) => {
  return (
    <Box className="global-content-maxWidth" m="0 auto !important">
      <Box mb="2rem">
        <WhiteStrokedHeader textAlign={"center"}>Resume</WhiteStrokedHeader>
      </Box>
      <Flex
        justifyContent="space-between"
        flexDir={["column", null, null, "row"]}
      >
        <ResumeDownloadSection />
        {/* <ResumeInfo /> */}
      </Flex>
    </Box>
  );
};

export default React.memo(ResumeSection) as React.FC;
