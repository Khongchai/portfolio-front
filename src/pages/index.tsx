import * as React from "react";
import { Box, Text } from "@chakra-ui/react";
import { SplashScreen } from "../component/splashScreen";

const IndexPage = () => {
  return (
    <>
      <SplashScreen zIndex={2} />
      <Box zIndex={1} position="relative">
        <Text letterSpacing="2px">Landing Page</Text>
      </Box>
    </>
  );
};

export default IndexPage;
