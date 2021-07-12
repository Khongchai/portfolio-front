import { Box, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import {
  TechnologyEntity,
  useGetTechnologiesAssignedToRoleQuery,
} from "../../generated/graphql";
import { AboutMeBanner } from "../components/AboutMeBanner";
import { ProjectHighlightsSection } from "../components/ProjectHighlightsSection";
import { ResumeDownloadSection } from "../components/ResumeDownloadSection";
import { TechSection } from "../components/TechnologiesSection";
import { TechNameCard } from "../components/TechnologiesSection/TechNameCard";
import { GridContainer } from "../elements/GridContainer";
import { Line } from "../elements/Line";
import useHoverComponent from "../utils/useHoverComponent";

const IndexPage = () => {
  const [
    { fetching: fetchingTechnologies, data: technologiesData },
  ] = useGetTechnologiesAssignedToRoleQuery();
  const languages = technologiesData?.getTechnologiesAssignedToRole.lang;

  const [hoveredComponentName, setHoverComponentName] = useState<
    string | undefined
  >(undefined);
  useHoverComponent(hoveredComponentName);
  const mainSpacing = "2rem";

  return (
    <>
      <GridContainer width="100%" height="100%">
        <Stack
          gridColumn="content-begin / content-end"
          zIndex={1}
          position="relative"
          id="content"
          spacing={mainSpacing}
        >
          <Grid
            position="relative"
            alignItems="center"
            maxWidth="1000px"
            width={["auto", null, null, "1000px"]}
            margin="0 auto"
          >
            <Box ml="1rem" gridArea="1/1" zIndex="6" position="relative">
              <Heading
                background="mainGradient"
                backgroundClip="text"
                css={{ "-webkit-text-fill-color": "transparent" }}
                fontSize={["1.75rem", null, "2.5rem", null, "3.5rem"]}
                letterSpacing="6px"
                zIndex="6"
                display="inline"
                mb="1rem"
              >
                Hi there!
              </Heading>
              <Heading
                background="mainGradient"
                fontSize={["1.25rem", null, "2rem", null, "3rem"]}
                backgroundClip="text"
                css={{ "-webkit-text-fill-color": "transparent" }}
                size="2xl"
                letterSpacing={["unset", null, "6px"]}
                zIndex="6"
              >
                I'm Khong, a web dev whose <br /> fiery passions are all about{" "}
                <br /> coding and new innovations
              </Heading>
            </Box>
            <Stack
              opacity={[0.8, null, null, 1]}
              gridArea="1/1"
              zIndex="5"
              marginLeft="auto"
            >
              <StaticImage
                id="author-image"
                src="../images/khong-banner.png"
                alt="Author's image"
                layout="constrained"
                placeholder="blurred"
                width={500}
              />
            </Stack>
          </Grid>
          <Flex justify="center" position="relative" width="100%" height="auto">
            <Line dotPos="bottom" />
          </Flex>
          <Text
            width="100%"
            textAlign="center"
            fontFamily="proxima nova lt"
            fontWeight="300"
            fontSize="1.5rem"
            letterSpacing="2px"
            size="lg"
            p="1rem 0"
          >
            Technologies I have worked with
          </Text>
          <Box
            css={{ "> *": { marginBottom: "6rem" } }}
            textAlign="center"
            id="tech"
          >
            {hoveredComponentName ? (
              <TechNameCard hoveredComponentName={hoveredComponentName} />
            ) : null}
            <TechSection
              title="Front"
              technologies={
                technologiesData?.getTechnologiesAssignedToRole
                  .front as TechnologyEntity[]
              }
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />

            <TechSection
              title="Back"
              technologies={
                technologiesData?.getTechnologiesAssignedToRole
                  .back as TechnologyEntity[]
              }
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <TechSection
              title="Hosting"
              technologies={
                technologiesData?.getTechnologiesAssignedToRole
                  .hosting as TechnologyEntity[]
              }
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <TechSection
              title="Languages"
              technologies={languages as TechnologyEntity[] | undefined}
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
          </Box>
          <Flex justify="center" position="relative" width="100%" height="auto">
            <Line dotPos="top" />
          </Flex>
        </Stack>
      </GridContainer>
      <Box mb={`calc(${mainSpacing} + 4rem)`}>
        <ProjectHighlightsSection />
      </Box>
      <Box css={{ "> *": { marginTop: "2rem" } }}>
        <AboutMeBanner />
        <ResumeDownloadSection />
      </Box>
    </>
  );
};
export default IndexPage;
