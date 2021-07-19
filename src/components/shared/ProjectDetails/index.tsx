import {
  Button,
  Heading,
  Stack,
  Text,
  Link,
  Flex,
  Img,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ProjectEntity } from "../../../../generated/graphql";
import { CloudinaryResponsiveImage } from "../CloudinaryImageResponsiveContainer";
import { TechnologiesUsed } from "./TechnologiesUsed";

interface ProjectDetails {
  project: ProjectEntity;
  noGrayScale?: boolean;
}

const ProjectDetails: React.FC<ProjectDetails> = ({ project, noGrayScale }) => {
  const containerId = `${project.title}-container`;
  const [toggleShowTechnologies, setToggleShowTechnolgoies] = useState(false);

  return (
    <>
      <TechnologiesUsed
        project={project}
        showThis={toggleShowTechnologies}
        toggleShowThis={setToggleShowTechnolgoies}
      />
      <Flex
        flexDir={["column", null, null, null, "row"]}
        display="flex"
        padding={["5rem 0rem", null, null, "5rem 3rem"]}
        bg={`url('${project.heroImgLink}')`}
        backgroundPosition="bottom"
        bgRepeat="no-repeat"
        backgroundSize="cover"
        transition=".3s"
        filter={noGrayScale ? null : "grayscale(1)"}
        opacity={noGrayScale ? null : 1}
        id={containerId}
        _hover={{ filter: "grayscale(0)", opacity: 1 }}
      >
        <Stack
          background="rgba(0,0,0, 0.3)"
          padding="1.25rem 1.5rem"
          spacing="3rem"
          mb="1.5rem"
          flex="1"
        >
          <Heading size="3xl" textTransform="capitalize">
            {project.title}
          </Heading>
          <Text
            fontFamily="proxima nova rg"
            textShadow="black 0px 2px 10px"
            fontWeight="normal"
            height="200px"
            maxHeight="200px"
            minHeight="200px"
            overflowY="auto"
          >
            {project.description}
          </Text>
          <Stack
            display="flex"
            flexDirection="column"
            align="center"
            spacing="1.5rem"
          >
            <Flex>
              <Button
                width="fit-content"
                margin="0 auto"
                bg="transparent"
                border="1px solid white"
                as={Link}
                textDecor="none !important"
                target="_blank"
                href={project.websiteLink}
                mr="1rem"
              >
                VIEW WEBSITE
              </Button>
              <Button
                width="fit-content"
                margin="0 auto"
                bg="transparent"
                border="1px solid white"
                textDecor="none !important"
                href={project.websiteLink}
                onClick={() => {
                  setToggleShowTechnolgoies(true);
                }}
              >
                TECHNOLOGIES USED
              </Button>
            </Flex>
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
              <Img
                src="/logos/github.png"
                filter="invert(1)"
                w="30px"
                alt="github logo"
                h="30px"
              />
            </Link>
          </Stack>
        </Stack>
        <Grid placeItems="center" ml={[0, null, null, "1rem"]} flex="1">
          {project.imgLink ? (
            <CloudinaryResponsiveImage
              imgLink={project.imgLink}
              projectTitle={project.title}
              imageActualWidth={"1440px"}
              imageActualHeight={"1080px"}
            />
          ) : (
            <Text
              display="block"
              textAlign="center"
              transform="rotate(20deg)"
              fontSize="1.5em"
              p="6rem 0"
              letterSpacing="1.7"
              className="fadein"
            >
              Preview Image Not Available
            </Text>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default ProjectDetails;
