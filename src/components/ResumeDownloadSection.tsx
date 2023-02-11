import { Button, Flex, Link, Text } from "@chakra-ui/react";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";

interface ResumeDownloadSectionProps {
  donotCenter?: boolean;
  withText?: boolean;
}

export const ResumeDownloadSection: React.FC<ResumeDownloadSectionProps> = ({
  donotCenter,
  withText
}) => {
  return (
    <Flex
      align="center"
      w="100%"
      justify={["center", null, null, donotCenter ? null : "center"]}
      flexDir={["column", null, null, "row"]}
      p="5rem 0"
      id="resume-section"
    >
      {
        withText ?
          <Text fontSize="30px" margin={["0 0 16px 0", null, "0 0 32px 0", "0 84px 0 0"]}>RESUME</Text>
          : <></>
      }
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
        href="downloadables/khongchai-resume.pdf"
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
