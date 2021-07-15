import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";

interface ResumeDownloadSectionProps {
  donotCenter?: boolean;
}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({
  donotCenter,
}) => {
  return (
    <Flex
      align="center"
      w="100%"
      justify={["center", null, null, donotCenter ? null : "center"]}
      p="5rem 0"
    >
      <Text mr="2rem">RESUME PDF</Text>
      <Button
        bg="black"
        border="1px solid white"
        padding="1.75rem 1.25rem"
        fontFamily="proxima nova lt"
        fontWeight="300"
        className="hover-gradient"
        _hover={{ background: "unset" }}
        as={Link}
        target="_blank"
        href="downloadables/khong-portfolio.pdf"
      >
        <StaticImage
          alt="download-indicator"
          src="../images/download-indicator.png"
        />
        <Text>DOWNLOAD</Text>
      </Button>
    </Flex>
  );
};
