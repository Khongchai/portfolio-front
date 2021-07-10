import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { SplashText } from "./SplashTexts";
import { WobblyThreejs } from "./WobblyThreejs";

export const SplashScreen: React.FC<{ zIndex: number }> = ({ zIndex }) => {
  const splashContainer = useRef(null);

  useEffect(() => {
    if (splashContainer.current) {
      const container = splashContainer.current as HTMLElement;
      container.addEventListener("animationend", () => {
        container.remove();
      });
      setTimeout(() => {
        container.classList.add("fade-out");
      }, 4000);
    }
  }, []);

  return (
    <Grid
      ref={splashContainer}
      placeItems="center"
      zIndex={zIndex}
      position="fixed"
      w="100vw"
      h="100vh"
      top="0"
      bg="mainBlack"
      id="splash-screen-container"
    >
      <Box
        id="splash-text-container"
        textAlign="center"
        pos="relative"
        padding={["3.5rem", null, "7rem"]}
      >
        <SplashText />
        <Box
          class="wobbly-container"
          w="100%"
          h="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <WobblyThreejs />
        </Box>
      </Box>
    </Grid>
  );
};
