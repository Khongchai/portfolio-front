import { Box, Heading } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export function Flags() {
  const flagWidth = 30;
  return (
    <Box id="flag-container">
      <Heading mb="1rem" size="md">
        Languages
      </Heading>
      <Box css={{ "> *": { marginRight: "0.75rem" } }}>
        <StaticImage
          width={flagWidth}
          alt="Thai Flag"
          src="../../images/flags/thai.png"
        />
        <StaticImage
          width={flagWidth}
          alt="English Flag"
          src="../../images/flags/english.png"
        />
        <StaticImage
          width={flagWidth}
          alt="German Flag"
          src="../../images/flags/deutsch.png"
        />
        <StaticImage
          width={flagWidth}
          alt="Russian Flag"
          src="../../images/flags/russki.png"
        />
      </Box>
    </Box>
  );
}
