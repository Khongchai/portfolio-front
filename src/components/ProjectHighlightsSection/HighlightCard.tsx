import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  Link,
  Flex,
  Image,
  Img,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { CloudinaryResponsiveImage } from "../shared/CloudinaryImageResponsiveContainer";

interface HighlightCardProps {
  project: ProjectEntity;
}

export const HighlightCard: React.FC<HighlightCardProps> = ({ project }) => {
  const containerId = `${project.title}-container`;

  return (
    <Flex
      flexDir={["column", null, null, "row"]}
      display="flex"
      padding={["5rem 1rem", null, null, "5rem 3rem"]}
      bg={`url('${project.heroImgLink}')`}
      backgroundPosition="bottom"
      bgRepeat="no-repeat"
      backgroundSize="cover"
      transition=".3s"
      filter="grayscale(1)"
      opacity="0.6"
      id={containerId}
      _hover={{ filter: "grayscale(0)", opacity: "0.9" }}
    >
      <Stack spacing="3rem" mb="1.5rem" flex="1">
        <Heading size="3xl" textTransform="capitalize">
          {project.title}
        </Heading>
        <Text
          fontFamily="proxima nova rg"
          textShadow="black 0px 2px 10px"
          fontWeight="normal"
        >
          {project.description}
        </Text>
        <Stack
          display="flex"
          flexDirection="column"
          align="center"
          spacing="1.5rem"
        >
          <Button
            width="fit-content"
            margin="0 auto"
            bg="transparent"
            border="1px solid white"
            as={Link}
            textDecor="none !important"
            target="_blank"
            href={project.websiteLink}
          >
            VIEW WEBSITE
          </Button>
          {project.playStoreLink ? (
            <Link target="_blank" href={project.playStoreLink}>
              <Img
                src="/logos/googleplay.png"
                alt="google play logo"
                h="50px"
              />
            </Link>
          ) : null}
          <Link href={project.githubLink} target="_blank">
            <Img src="/logos/github.png" w="30px" alt="github logo" h="30px" />
          </Link>
        </Stack>
      </Stack>
      <Grid placeItems="center" flex="1">
        <CloudinaryResponsiveImage
          imgLink={project.imgLink}
          projectTitle={project.title}
          imageActualWidth={"1440px"}
          imageActualHeight={"1080px"}
        />
      </Grid>
    </Flex>
  );
};
