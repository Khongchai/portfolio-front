import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ProjectEntity, TechnologyEntity } from "../../../../generated/graphql";
import useHoverComponent from "../../../utils/useHoverComponent";
import { TechSection } from "../../TechnologiesSection";
import { TechNameCard } from "../../TechnologiesSection/TechNameCard";

interface TechnologiesUsedProps {
  project: ProjectEntity;
  showThis: boolean;
  toggleShowThis: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TechnologiesUsed: React.FC<TechnologiesUsedProps> = ({
  project,
  showThis,
  toggleShowThis,
}) => {
  const [hoveredComponentName, setHoverComponentName] = useState<
    string | undefined
  >(undefined);
  useHoverComponent(hoveredComponentName);
  const [forceUpdateTextsFallback, setForceUpdateTextsFallback] = useState(
    false
  );

  type TechnologiesAndRoles = { role: string; techs: TechnologyEntity[] };
  const thisComponent = useRef(null);
  const allTechnologies: TechnologiesAndRoles[] = [
    {
      role: "Frontend",
      techs: project.frontEndTechnologies,
    },
    {
      role: "Backend",
      techs: project.backEndTechnologies,
    },
    {
      role: "Languages",
      techs: project.languages,
    },
    {
      role: "Hosting",
      techs: project.hostingServices,
    },
  ];

  useEffect(() => {
    if (!showThis) {
      thisComponent.current.style.opacity = "0";
      thisComponent.current.style.pointerEvents = "none";
    } else {
      thisComponent.current.style.opacity = "1";
      thisComponent.current.style.pointerEvents = "unset";
    }
  }, [showThis]);

  return (
    <Grid
      background="rgba(0,0,0,0.95)"
      pt="2rem"
      position="fixed"
      top="0"
      left="0"
      m="0 !important"
      height="100vh"
      width="100vw"
      zIndex="99999"
      overflowY="scroll"
      transition=".3s"
      placeItems="center"
      cursor="pointer"
      ref={thisComponent}
      opacity="0"
      onClick={() => {
        toggleShowThis(false);
        setForceUpdateTextsFallback(!forceUpdateTextsFallback);
      }}
    >
      {hoveredComponentName ? (
        <TechNameCard hoveredComponentName={hoveredComponentName} />
      ) : null}
      <Stack
        spacing={["1rem", null, "2rem", null, "3rem"]}
        textAlign="center"
        id="tech"
      >
        {allTechnologies.map((tech) => {
          if (tech.techs.length > 0) {
            return (
              <TechSection
                forceUpdateFallbackTexts={forceUpdateTextsFallback}
                key={tech.role}
                title={tech.role}
                techTitles={tech.techs.map((front) => front?.title)}
                fetching={false}
                setHoverComponentName={setHoverComponentName}
              />
            );
          }
          return null;
        })}
      </Stack>
    </Grid>
  );
};
