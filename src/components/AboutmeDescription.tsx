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
          <b>I'm a web dev,</b> of many interests! I love creating, learning,
          and solving problems. My current learning focus is primarily on the
          dev ops and software architecture side but on a day-to-day basis, I
          work also on the front and backend of my personal projects building.
        </StyledText>
        <br />
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
