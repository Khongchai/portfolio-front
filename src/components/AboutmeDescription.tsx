import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import { large } from "../constants/stackSpacing";
import { ThreejsGeometries } from "../utils/Threejs/ThreejsGeometries";

interface AboutmeDescriptionProps {}

export const AboutMeDescriptionSection: React.FC<AboutmeDescriptionProps> = ({}) => {
  useEffect(() => {
    const geometriesCanvas = document.getElementById(
      "threejs-geometries"
    ) as HTMLCanvasElement | null;
    const geometriesCanvasContainer = document.getElementById(
      "threejs-geometries-container"
    ) as HTMLCanvasElement | null;
    if (geometriesCanvas && geometriesCanvasContainer) {
      const threejsGeometries = new ThreejsGeometries(
        geometriesCanvas,
        geometriesCanvasContainer
      );
      threejsGeometries.action();
    }
  }, []);
  return (
    <Flex
      margin={`${large} 0 !important`}
      flexDir={["column", null, null, "row"]}
      align="center"
    >
      <Grid flex="0.4" m={["0 0 4rem 0", null, null, "0 4rem 0 0"]}>
        <Grid placeItems="center" gridArea="1/1" position="relative" zIndex="5">
          <Box width="60%" height="50%" id="threejs-geometries-container">
            <canvas id="threejs-geometries" width="100%" height="100%" />
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
          As an aspiring web developer who loves learning and solving problems.
          Working as a team or in any collaborative project, I seek to always
          inspire and motivate myself. Ever since I stepped into the software
          engineering world, I have been infatuated with the whole software
          development process. The challenges it poses were exactly what I
          craved. Every bug lavished, and every line of code relished, I enjoy
          every single step of software development. I work mostly on the
          frontend and backend, but my focus is primarily on frontend and webGL
          animation. My projects in the past range from an interactive binaural
          music application for Android (Java) to an e-commerce website (in
          progress) where I sell my own music
        </StyledText>
        <br />
        <StyledText>
          I work mostly on the frontend and backend, but my focus is primarily
          on frontend and webGL animation.
        </StyledText>
        <StyledText>
          My projects in the past range from an interactive binaural music
          application for Android (Java) to an e-commerce website (in progress)
          where I sell my own music.
          <u>
            <Link to="/projects">projects</Link> page.
          </u>
        </StyledText>
        <br />
        <StyledText>
          I work mostly on the frontend and backend, but my focus is primarily
          on frontend and webGL animation.
        </StyledText>
        <StyledText>
          Other non-software development related stuff I am learning are Linear
          Algebra, and animations (three.js + Blender).
        </StyledText>
      </Box>
    </Flex>
  );
};

const StyledText: React.FC = ({ children }) => {
  return <Text fontSize="lg">{children}</Text>;
};
