import { Box, Stack, Text, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { SplashScreen } from "../components/splashScreen/index";
import { GridContainer } from "../elements/GridContainer";
import { StaticImage } from "gatsby-plugin-image";
import { Line } from "../elements/Line";
import { TechSection } from "../components/TechnologiesSection";
import {
  TechnologyEntity,
  useGetTechnologiesAssignedToRoleQuery,
} from "../../generated/graphql";
import { TechNameCard } from "../components/TechnologiesSection/TechNameCard";
import useHoverComponent from "../utils/useHoverComponent";
import { AboutMeBanner } from "../components/AboutMeBanner";

const IndexPage = () => {
  const [
    { fetching: fetchingTechnologies, data: technologiesData },
  ] = useGetTechnologiesAssignedToRoleQuery();
  const languages = technologiesData?.getTechnologiesAssignedToRole.lang;

  const [hoveredComponentName, setHoverComponentName] = useState<
    string | undefined
  >(undefined);
  useHoverComponent(hoveredComponentName);

  return (
    <>
      {/* <SplashScreen zIndex={999} /> */}

      <GridContainer width="100%" height="100%">
        <Stack
          gridColumn="content-begin / content-end"
          zIndex={1}
          position="relative"
          id="content"
          spacing="2rem"
        >
          <Flex
            position="relative"
            alignItems="center"
            maxWidth="1000px"
            width={["100%", null, null, "80%"]}
          >
            <Heading
              background="mainGradient"
              backgroundClip="text"
              css={{ "-webkit-text-fill-color": "transparent" }}
              size="xl"
              letterSpacing="2px"
              position="absolute"
              zIndex="6"
            >
              Hi there! I'm Khong, a web dev whose fiery passions are all about
              coding and new innovations.
            </Heading>
            <Stack zIndex="5" marginLeft="auto">
              <StaticImage
                id="author-image"
                src="../images/khong-banner.png"
                alt="Author's image"
                layout="constrained"
                placeholder="blurred"
                width={500}
              />
            </Stack>
          </Flex>
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
          >
            Technologies I have worked with
          </Text>

          <Box
            css={{ "> *": { marginBottom: "3rem" } }}
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
            <hr />

            <TechSection
              title="Back"
              technologies={
                technologiesData?.getTechnologiesAssignedToRole
                  .back as TechnologyEntity[]
              }
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <hr />
            <TechSection
              title="Hosting"
              technologies={
                technologiesData?.getTechnologiesAssignedToRole
                  .hosting as TechnologyEntity[]
              }
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <hr />
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
          <AboutMeBanner />
        </Stack>
      </GridContainer>
    </>
  );
};
export default IndexPage;
