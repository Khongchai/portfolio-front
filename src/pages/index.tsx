import { Box, Flex, Heading } from "@chakra-ui/react";
import * as React from "react";
import { SplashScreen } from "../components/splashScreen/index";
import { GridContainer } from "../elements/GridContainer";

const IndexPage = () => {
  return (
    <>
      {/* <SplashScreen zIndex={2} /> */}
      <GridContainer width="100%" height="100%">
        <Box
          gridColumn="content-begin / content-end"
          zIndex={1}
          position="relative"
        >
          <Flex alignItems="center" width="60%">
            <Heading
              background="mainGradient"
              backgroundClip="text"
              css={{ "-webkit-text-fill-color": "transparent" }}
              size="xl"
              letterSpacing="2px"
            >
              Hi there! I'm Khong, a web dev who's passionate about coding and
              new innovations.
            </Heading>
          </Flex>
        </Box>
      </GridContainer>
    </>
  );
};

export default IndexPage;
