import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { setCookie } from "../../utils/cookie/setCookie";
import { SplashText } from "./SplashTexts";
import { WobblyThreejs } from "./WobblyThreejs";

export const SplashScreen: React.FC<{ zIndex: number }> = ({ zIndex }) => {
  const splashContainer = useRef(null);

  useEffect(() => {
    // removeSplashScreen();
  }, []);

  function removeSplashScreen() {
    const container = splashContainer.current as HTMLElement;
    container.addEventListener("animationend", () => {
      container.remove();
    });
    setTimeout(() => {
      container.classList.add("fade-out");
      setCookie("visitAlready", "true", 1);
    }, 4000);
  }

  return (
    <Box
      display="grid"
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
          className="wobbly-container"
          id="splashscreen-wobbly-container"
          w="100%"
          h="100%"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <WobblyThreejs canvasId="splash-screen-wobbly" />
        </Box>
      </Box>
    </Box>
  );
};
