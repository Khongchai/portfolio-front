import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import { large } from "../constants/stackSpacing";
import { ThreejsGeometries } from "../utils/Threejs/ThreejsGeometries";

const _AboutMeDescriptionSection: React.FC = () => {
  useEffect(() => {
    let threejsGeometries: ThreejsGeometries | undefined;
    const geometriesCanvas = document.getElementById(
      "threejs-geometries"
    ) as HTMLCanvasElement | null;
    const geometriesCanvasContainer = document.getElementById(
      "threejs-geometries-container"
    ) as HTMLCanvasElement | null;
    if (geometriesCanvas && geometriesCanvasContainer) {
      threejsGeometries = new ThreejsGeometries(
        geometriesCanvas,
        geometriesCanvasContainer
      );
      threejsGeometries.action();
    }
    return () => {
      if (threejsGeometries) {
        threejsGeometries.removeEventListeners();
      }
    };
  }, []);

  return (
    <Flex
      m="0 auto !important"
      flexDir={["column", null, null, "row"]}
      align="center"
      className="global-content-maxWidth"
      p="3rem 0"
    >
      <Grid flex="0.4" m={["0 0 4rem 0", null, null, "0 4rem 0 0"]}>
        <Grid placeItems="center" gridArea="1/1" position="relative" zIndex="5">
          <Box
            width="60%"
            // For some reason, using just 50% sometimes does not give proper height
            height="calc(100% - 50%)"
            id="threejs-geometries-container"
          >
            <canvas
              style={{ pointerEvents: "none" }}
              id="threejs-geometries"
              width="100%"
              height="100%"
            />
          </Box>
        </Grid>
        <StaticImage
          style={{ gridArea: "1/1", position: "relative", zIndex: 4 }}
          src="../../static/images/about-me-image.png"
          alt="about-me-image"
        />
      </Grid>
      <Box flex="0.6">
        <StyledText>
          I am highly motivated and passionate about software development. I thrive
          in collaborative settings and am dedicated to motivating myself and my
          team. In my free time, I enjoy creating interactive and visually impressive
          front-end projects, as well as experimenting with different UI libraries. By
          exploring these technologies, I am able to bring a unique perspective and
          expertise to my everyday front-end and back-end work. I approach
          software development with dedication and a love for the craft, relishing the
          challenges it presents.
        </StyledText>
        <br />
        <StyledText>
          In addition to my software development skills, as a musician, I have a
          significant background in music, with over 8 years of experience in various
          professional and collaborative artistic environments. These diverse
          experiences have allowed me to develop strong teamwork and
          communication skills, as well as a creative and adaptable approach to
          problem-solving.
        </StyledText>
        <br />
        <StyledText>
          I am very passionate about building software. The satisfaction and joy from seeing a project come to life...there's nothing quite like it. I am fully committed on continuinng this journey for a very very long time.
        </StyledText>

      </Box>
    </Flex>
  );
};

const StyledText: React.FC = ({ children }) => {
  return <Text fontSize="lg">{children}</Text>;
};

export const AboutMeDescriptionSection = React.memo(_AboutMeDescriptionSection);
