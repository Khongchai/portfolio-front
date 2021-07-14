import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { large } from "../constants/stackSpacing";

interface AboutmeDescriptionProps {}

export const AboutMeDescriptionSection: React.FC<AboutmeDescriptionProps> = ({}) => {
  return (
    <Flex
      margin={`${large} 0 !important`}
      flexDir={["column", null, null, "row"]}
      align="center"
    >
      <Grid flex="0.4" m={["0 0 4rem 0", null, null, "0 4rem 0 0"]}>
        <Grid
          placeItems="center"
          gridArea="1/1"
          id="threejs-geometries-container"
          position="relative"
          zIndex="5"
        >
          <Box
            bg="brown"
            width={`${267 * 1.3}px`}
            height={`${160 * 1.3}px`}
          ></Box>
        </Grid>
        <StaticImage
          style={{ gridArea: "1/1", position: "relative", zIndex: 4 }}
          src="../../static/images/about-me-image.png"
          alt="about-me-image"
        />
      </Grid>
      <Box flex="0.6">
        <StyledText>
          As an aspiring <b>web developer</b> who loves learning and solving
          problems. Working as a team or in any collaborative project, I seek to
          always inspire and motivate both my fellow collaborators and myself.
          Ever since I stepped into the software engineering world, I have been
          infatuated with the whole software development process. The challenges
          it poses were exactly what I craved.
        </StyledText>
        <br />
        <StyledText>
          As uncongenial as some problems may be, I face them with full
          confidence, lavishing in the process; knowing full well that in doing
          so, I will not only have solved the problem but will also have picked
          up one of the most useful skills for the 21st century.
        </StyledText>
        <StyledText>
          My projects range from an interactive binaural music application for
          Android (Java) to an e-commerce website (in progress) where I sell my
          music (I'm also a composer, you see). For more details about my
          projects, you can visit the{" "}
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
