import { Box, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { GridContainer } from "../elements/GridContainer";
import { medium } from "../constants/stackSpacing";
import { Line } from "../components/shared/Line";
import { AboutMeDescriptionSection } from "../components/AboutmeDescription";

interface aboutProps {}

const about: React.FC<aboutProps> = ({}) => {
  return (
    <GridContainer width="100%" height="100%">
      <Stack spacing={medium} gridColumn="content-begin / content-end">
        <Box css={{ "> *": { marginTop: "10rem" } }}>
          <Heading
            textAlign="center"
            background="mainGradient"
            backgroundClip="text"
            css={{ "-webkit-text-fill-color": "transparent" }}
            fontSize={["1.75rem", null, "2.5rem", null, "3.5rem"]}
          >
            A developer and a life-long student
          </Heading>
          <Heading
            textAlign="center"
            css={{
              WebkitTextFillColor: "black",
              WebkitTextStrokeWidth: "0.8px",
              WebkitTextStrokeColor: "white",
            }}
            fontFamily="proxima nova lt"
            fontWeight="600"
            color="black"
            letterSpacing="5px"
            fontSize="3rem"
          >
            Let's learn more about me
          </Heading>
        </Box>
        <Line dotPos="bottom" />
        <AboutMeDescriptionSection />
      </Stack>
    </GridContainer>
  );
};

export default about;
