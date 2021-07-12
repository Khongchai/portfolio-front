import { Box, Text, Stack, Heading } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import { useGetHighlightedProjectsQuery } from "../../../generated/graphql";
import { HighlightCard } from "./HighlightCard";

interface ProjectHighlightsSectionProps {}

export const ProjectHighlightsSection: React.FC<ProjectHighlightsSectionProps> = ({}) => {
  const [{ data, fetching }] = useGetHighlightedProjectsQuery();
  const highlightedProjects = data?.getHighlightedProjects;
  return (
    <Stack spacing="1.5rem">
      {!fetching && data ? (
        <>
          <Heading size="lg">MY PROJECTS</Heading>
          {highlightedProjects.map((project) => (
            <HighlightCard project={project} />
          ))}
          <Text to="/projects" textAlign="center" as={Link}>
            See all projects
          </Text>
        </>
      ) : (
        <Text>...Loading</Text>
      )}
    </Stack>
  );
};
