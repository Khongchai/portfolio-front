import { Box, Stack, Flex, Heading } from "@chakra-ui/react";
import * as React from "react";
import { SplashScreen } from "../components/splashScreen/index";
import { GridContainer } from "../elements/GridContainer";
import { StaticImage } from "gatsby-plugin-image";
import { Line } from "../elements/Line";

const IndexPage = () => {
  return (
    <>
      {/* <SplashScreen zIndex={999} /> */}
      <GridContainer width="100%" height="100%">
        <Stack
          gridColumn="content-begin / content-end"
          zIndex={1}
          position="relative"
          id="content"
          spacing="2rem"
        >
          <Flex
            position="relative"
            alignItems="center"
            maxWidth="1000px"
            width={["100%", null, null, "80%"]}
          >
            <Heading
              background="mainGradient"
              backgroundClip="text"
              css={{ "-webkit-text-fill-color": "transparent" }}
              size="xl"
              letterSpacing="2px"
              position="absolute"
              zIndex="6"
            >
              Hi there! I'm Khong, a web dev whose fiery passions are all about
              coding and new innovations.
            </Heading>
            <Stack zIndex="5" marginLeft="auto">
              <StaticImage
                id="author-image"
                src="../images/khong-banner.png"
                alt="Author's image"
                layout="constrained"
                placeholder="blurred"
                width={500}
              />
            </Stack>
          </Flex>
          <Flex justify="center" position="relative" width="100%" height="auto">
            <Line />
          </Flex>
        </Stack>
      </GridContainer>
    </>
  );
};

export default IndexPage;
