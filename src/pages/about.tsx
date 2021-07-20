import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { GridContainer } from "../elements/GridContainer";
import { medium } from "../constants/stackSpacing";
import { Line } from "../components/shared/Line";
import { AboutMeDescriptionSection } from "../components/AboutmeDescription";
import { useGetTechnologiesAssignedToRoleQuery } from "../../generated/graphql";
import useHoverComponent from "../utils/useHoverComponent";
import { TechNameCard } from "../components/TechnologiesSection/TechNameCard";
import { TechSection } from "../components/TechnologiesSection";
import ResumeSection from "../components/ResumeSection";

interface aboutProps {}

const about: React.FC<aboutProps> = ({}) => {
  const [
    { fetching: fetchingTechnologies, data: technologiesData },
  ] = useGetTechnologiesAssignedToRoleQuery();
  const languages = technologiesData?.getTechnologiesAssignedToRole.lang;
  const frameworksNotDestructured = technologiesData
    ? [
        ...technologiesData.getTechnologiesAssignedToRole.back,
        ...technologiesData.getTechnologiesAssignedToRole.hosting,
        ...technologiesData.getTechnologiesAssignedToRole.front,
      ]
    : null;
  const frameworks = useMemo(
    () => frameworksNotDestructured?.map((framework) => framework.title),
    [technologiesData]
  );

  const [hoveredComponentName, setHoverComponentName] = useState<
    string | undefined
  >(undefined);
  useHoverComponent(hoveredComponentName);

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
          <Heading textAlign="center" className="white-stroked-text-header">
            Let's learn more about me
          </Heading>
        </Box>
        <Line dotPos="bottom" />
        <AboutMeDescriptionSection />
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
            title="Tech"
            techTitles={frameworks}
            fetching={fetchingTechnologies}
            setHoverComponentName={setHoverComponentName}
          />

          <TechSection
            title="Languages"
            techTitles={languages?.map((lang) => lang.title)}
            fetching={fetchingTechnologies}
            setHoverComponentName={setHoverComponentName}
          />
          <TechSection
            title="Other Applications"
            techTitles={[
              "After Effects",
              "Figma",
              "Blender",
              "Audition",
              "FL Studio",
            ]}
            fetching={fetchingTechnologies}
            setHoverComponentName={setHoverComponentName}
          />
        </Box>
        <ResumeSection />
      </Stack>
    </GridContainer>
  );
};

export default about;
