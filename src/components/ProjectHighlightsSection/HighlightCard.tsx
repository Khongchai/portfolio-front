import { Box, Button, Heading, Stack, Text, Link } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { getCloudinaryResponsiveUrl } from "../../utils/getCloudinaryResponsiveUI";

interface HighlightCardProps {
  project: ProjectEntity;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ project }) => {
  return (
    <Box display="grid">
      <Box
        height="100%"
        flexDir="row"
        display="flex"
        padding="5rem 3rem"
        gridArea="1/1"
      >
        <Stack spacing="3rem" flex="1">
          <Heading size="3xl" textTransform="capitalize">
            {project.title}
          </Heading>
          <Text>{project.description}</Text>
          <Button
            width="fit-content"
            margin="0 auto"
            as={Link}
            to={project.websiteLink}
          >
            VIEW MY WORK
          </Button>
        </Stack>
        <Box flex="1">Website image</Box>
      </Box>
      <Box></Box>
    </Box>
  );
};
