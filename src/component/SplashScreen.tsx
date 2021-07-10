import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const SplashScreen: React.FC<{ zIndex: number }> = ({ zIndex }) => {
  return (
    <Grid
      placeItems="center"
      zIndex={zIndex}
      position="fixed"
      w="100vw"
      h="100vh"
      bg="mainBlack"
    >
      <Box textAlign="center">
        <Heading as="h2" size="xl" color="mainWhite" letterSpacing="2px">
          KHONGCHAI.G
        </Heading>
        <Box
          bg="mainGradient"
          margin="0 auto"
          w="fit-content"
          backgroundClip="text"
        >
          <Heading as="h3" size="l">
            Portfolio
          </Heading>
        </Box>
      </Box>
    </Grid>
  );
};
