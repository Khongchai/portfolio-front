import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import { useGetHighlightedProjectsQuery } from "../../../generated/graphql";
import { GridContainer } from "../../elements/GridContainer";
import ProjectDetails from "../shared/ProjectDetails";

interface ProjectHighlightsSectionProps {}

export const ProjectHighlightsSection: React.FC<ProjectHighlightsSectionProps> = ({}) => {
  const [{ data, fetching }] = useGetHighlightedProjectsQuery();
  const highlightedProjects = data?.getHighlightedProjects;

  return (
    <GridContainer width="100%" height="100%">
      <Flex
        width="100%"
        height="fit-content"
        justify="center"
        gridColumn={["1 / -1", null, null, "content-begin / content-end"]}
      >
        <Stack spacing="3rem" maxWidth="1180px">
          {!fetching && data ? (
            <>
              <Heading ml={["1rem", null, null, 0]} size="lg">
                MY PROJECTS
              </Heading>
              {highlightedProjects.map((project) => {
                return <ProjectDetails key={project.title} project={project} />;
              })}
              <Text to="/projects" textAlign="center" as={Link}>
                See all projects
              </Text>
            </>
          ) : (
            <Text>Loading Projects Information...</Text>
          )}
        </Stack>
      </Flex>
    </GridContainer>
  );
};
