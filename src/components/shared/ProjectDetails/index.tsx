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
        display="flex"
        bg={`url('${project.heroImgLink}')`}
        backgroundPosition="center"
        bgRepeat="no-repeat"
        backgroundSize="cover"
        transition=".3s"
        filter={noGrayScale ? null : "grayscale(1)"}
        opacity={noGrayScale ? null : 1}
        id={containerId}
        _hover={{ filter: "grayscale(0)", opacity: 1 }}
      >
        <Flex
          flexDir={["column", null, null, null, "row"]}
          pb={["2rem", null, null, 0]}
          transition="background .3s"
          width="100%"
          height="100%"
          background="rgba(0,0,0,0.3)"
          _hover={{ background: "rgba(0,0,0,0.5)" }}
        >
          <Stack
            padding={[
              "4rem 1rem 2rem 1rem",
              null,
              null,
              "5rem 3rem 2rem 3rem",
              "5rem 3rem",
            ]}
            alignItems={["center", null, null, "unset"]}
            transition=".3s"
            spacing="3rem"
            mb={["1rem", null, null, 0]}
            flex={["1", null, null, "0.5"]}
          >
            <Heading width="fit-content" fontSize={["2xl", "3xl", "4xl", "5xl"]} textTransform="capitalize" whiteSpace={"nowrap"}>
              {project.title}
            </Heading>
            <Text
              width="fit-content"
              fontFamily="proxima nova rg"
              textShadow="black 0px 2px 10px"
              fontWeight="normal"
              maxHeight={["250px", null, null, "200px"]}
              textAlign={["center", null, null, "unset"]}
              minHeight={["90px", null, "150px", null, "200px"]}
              marginTop="1rem !important"
              overflowY="auto"
              fontSize={["0.75rem", null, "1rem"]}
            >
              {project.description}
            </Text>
            <Stack
              display="flex"
              flexDirection="column"
              align="center"
              spacing="1.5rem"
            >
              <Flex flexDir={["column", null, "row"]}>
                {
                  project.websiteLink ?
                    <Button
                      width="fit-content"
                      margin="0 auto"
                      mr={["auto", null, "1rem"]}
                      bg="transparent"
                      border="1px solid white"
                      as={Link}
                      textDecor="none !important"
                      target="_blank"
                      pointerEvents={project.websiteLink ? "auto" : "none"}
                      href={project.websiteLink}
                      mb={["0.75rem", null, "0"]}
                    >
                      VIEW WEBSITE
                    </Button> : <></>
                }

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
                  data-cy="show-technologies-button"
                >
                  TECHNOLOGIES USED
                </Button>
              </Flex>
              <Flex height="40px" align="center">
                {project.playStoreLink ? (
                  <Link
                    mr="1.25rem"
                    target="_blank"
                    href={project.playStoreLink}
                  >
                    <Img
                      src="/logos/googleplay.png"
                      alt="google play logo"
                      h="40px"
                    />
                  </Link>
                ) : null}
                {
                  project.githubLink ?
                    <Link href={project.githubLink} target="_blank">
                      <Img
                        src="/logos/github.png"
                        filter="invert(1)"
                        alt="github logo"
                        h="30px"
                      />
                    </Link>
                    : <></>
                }
              </Flex>
            </Stack>
          </Stack>
          {
            (project.imgLink === project.heroImgLink) && (project.imgLink && project.heroImgLink) ? <></> :
              <Grid
                placeItems="center"
                overflow="hidden"
                ml={[0, null, null, "1rem"]}
                flex={["1", null, null, "0.5"]}
                p="2.5rem"
              >
                {project.imgLink ? (
                  <CloudinaryResponsiveImage
                    imgLink={project.imgLink}
                    projectTitle={project.title}
                    imageActualWidth={`${1440 * 0.9}px`}
                    imageActualHeight={`${1080 * 0.9}px`}
                  />
                ) : (
                  // Show the preview image not available if all images are null.
                  !project.heroImgLink ?
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
                    </Text> : <></>
                )}
              </Grid>
          }
        </Flex>
      </Flex>
    </>
  );
};

export default ProjectDetails;
