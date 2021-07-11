import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";

interface ResumeDownloadSectionProps {}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({}) => {
  return (
    <Flex align="center" w="100%" justify="center" p="5rem 0">
      <Text mr="2rem">RESUME</Text>
      <Button
        bg="black"
        border="1px solid white"
        padding="1.75rem 1.25rem"
        fontFamily="proxima nova lt"
        fontWeight="300"
      >
        <StaticImage
          alt="download-indicator"
          src="../images/download-indicator.png"
        />
        DOWNLOAD
      </Button>
    </Flex>
  );
};
