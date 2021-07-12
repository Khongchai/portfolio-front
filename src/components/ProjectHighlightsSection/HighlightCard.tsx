import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
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
      <Flex
        height="100%"
        flexDir={["column", null, null, "row"]}
        display="flex"
        padding={["5rem 0", null, null, "5rem 3rem"]}
        gridArea="1/1"
      >
        <Stack spacing="3rem" mb="1.5rem" flex="1">
          <Heading size="3xl" textTransform="capitalize">
            {project.title}
          </Heading>
          <Text>{project.description}</Text>
          <Button
            width="fit-content"
            margin="0 auto"
            bg="transparent"
            border="1px solid white"
            as={Link}
            to={project.websiteLink}
          >
            VIEW MY WORK
          </Button>
        </Stack>
        <Box flex="1">Website image</Box>
      </Flex>
      <Box></Box>
    </Box>
  );
};
