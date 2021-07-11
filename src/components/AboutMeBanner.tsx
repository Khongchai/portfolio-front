import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { GridContainer } from "../elements/GridContainer";
import { ArrowRightIcon } from "@chakra-ui/icons";

export const AboutMeBanner: React.FC = ({}) => {
  const layout = "fullWidth";
  const height = 200;
  const flex = 0.22;
  const objectPosition = "left";

  return (
    <Box position="relative" height="600px" overflow="hidden">
      <GridContainer width="100%" height="100%" position="absolute">
        <Flex
          gridColumn="content-start / 2"
          flexDirection="column"
          justifyContent="space-evenly"
          position="relative"
          zIndex="10"
          pointerEvents="none"
        >
          <Text>WEBSITE</Text>
          <Heading size="3xl">ABOUT ME</Heading>
          <Box>
            <ArrowRightIcon w={6} h={6} />
          </Box>
        </Flex>
      </GridContainer>
      <Flex
        width="100%"
        height="100%"
        position="relative"
        zIndex="9"
        css={{
          "> *": {
            filter: "grayscale(1)",
            transition: ".3s",
            ":hover": { filter: "grayscale(0)", opacity: "1" },
          },
        }}
        justify="flex-end"
        background="secondaryBlack"
        minWidth="700px"
      >
        <StaticImage
          layout={layout}
          alt="khong's image"
          objectPosition={objectPosition}
          src="../images/code-1.png"
          objectFit="cover"
          height={height}
          style={{ flex: flex, opacity: 0.6 }}
        />

        <StaticImage
          layout={layout}
          alt="image of code 1"
          src="../images/khong-plays-viola.png"
          height={height}
          style={{ flex: flex, opacity: 0.8 }}
        />

        <StaticImage
          layout={layout}
          alt="khong's image"
          objectPosition={objectPosition}
          src="../images/code-2.png"
          objectFit="cover"
          height={height}
          style={{ flex: flex, opacity: 0.6 }}
        />
      </Flex>
    </Box>
  );
};
