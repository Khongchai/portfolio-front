import { Flex, Img, Text, Grid, Heading, Box } from "@chakra-ui/react";
import React from "react";

interface ProjectItemProps {
  imgLink?: string;
  title: string;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({ imgLink, title }) => {
  return (
    <Flex
      _hover={{ cursor: "pointer" }}
      padding="30px"
      align="center"
      flexDir="column"
    >
      {imgLink ? (
        <Box w="150px" h="150px" mb="1rem">
          <Img objectFit="cover" w="150px" h="150px" src={imgLink} />
        </Box>
      ) : (
        <Grid placeItems="center" w="150px" h="150px">
          <Text transform="rotate(-45deg)">No Preview Img</Text>
        </Grid>
      )}
      <Heading size="sm" textTransform="capitalize">
        {title}
      </Heading>
    </Flex>
  );
};
