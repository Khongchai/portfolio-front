import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { GridContainer } from "../elements/GridContainer";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "gatsby";

export const AboutMeBanner: React.FC = ({}) => {
  const layout = "fullWidth";
  const flex = 1;
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
          as={Link}
          className="hover-gradient"
          to="/about"
        >
          <Heading size="3xl">ABOUT ME</Heading>
          <ArrowRightIcon
            _hover={{ transform: "scale(1.4)" }}
            pointerEvents="auto"
            w={10}
            h={10}
          />
        </Flex>
      </GridContainer>

      <Flex
        paddingLeft="30%"
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
          alt="image of code 1"
          objectPosition={objectPosition}
          src="../images/code-1.png"
          style={{ flex: flex, opacity: 0.6 }}
          className="about-banner-left-img"
        />

        <StaticImage
          layout={layout}
          alt="khong's image"
          src="../images/khong-plays-viola.png"
          style={{ flex: flex, opacity: 0.8 }}
          className="about-banner-middle-img"
        />

        <StaticImage
          layout={layout}
          alt="khong's image"
          objectPosition={objectPosition}
          src="../images/code-2.png"
          style={{ flex: flex, opacity: 0.6 }}
          className="about-banner-right-img"
        />
      </Flex>
    </Box>
  );
};
