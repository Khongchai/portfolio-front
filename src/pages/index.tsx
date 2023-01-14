import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { invertScale } from "framer-motion/types/value/use-inverted-scale";
import { StaticImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { useGetTechnologiesAssignedToRoleQuery } from "../../generated/graphql";
import { AboutMeBanner } from "../components/AboutMeBanner";
import { ProjectHighlightsSection } from "../components/ProjectHighlightSection";
import { ResumeDownloadSection } from "../components/ResumeDownloadSection";
import { Line } from "../components/shared/Line";
import { TechSection } from "../components/TechnologiesSection";
import { TechNameCard } from "../components/TechnologiesSection/TechNameCard";
import { small } from "../constants/stackSpacing";
import { GridContainer } from "../elements/GridContainer";
import useHoverComponent from "../utils/useHoverComponent";

const IndexPage = () => {
  const [
    { fetching: fetchingTechnologies, data: technologiesData },
  ] = useGetTechnologiesAssignedToRoleQuery();
  const languages = technologiesData?.getTechnologiesAssignedToRole.lang;

  const [hoveredComponentName, setHoverComponentName] = useState<
    string | undefined
  >(undefined);
  useHoverComponent(hoveredComponentName);

  return (
    <>
      <GridContainer width="100%" height="100%">
        <Stack
          gridColumn="content-begin / content-end"
          zIndex={1}
          position="relative"
          id="content"
          spacing={small}
        >
          <Grid
            position="relative"
            alignItems="center"
            maxWidth="1000px"
            width={["auto", null, null, "1000px"]}
            margin="0 auto"
          >
            <Box ml="1rem" gridArea="1/1" zIndex="6" position="relative">
              <Heading
                className="gradient-text"
                fontSize={["1.75rem", null, "2.5rem", null, "3.5rem"]}
                letterSpacing="6px"
                zIndex="6"
                display="inline"
                mb="1rem"
              >
                Hi there!
              </Heading>
              <Heading
                className="gradient-text"
                fontSize={["1.25rem", null, "2rem", null, "3rem"]}
                size="2xl"
                letterSpacing={["unset", null, "6px"]}
                zIndex="6"
              >
                I'm Khong, a web dev whose <br /> fiery passions are all about{" "}
                <br /> coding and new innovations
              </Heading>
              <Box paddingTop="1rem" />
              <Text>This website is kind of out of date.</Text>
              <Text>I promise I'll update it as soon as I can :)</Text>
              <Text>
                For now, you can check out my{" "}
                <Link
                  target="_blank"
                  color="#f99f35"
                  href="https://github.com/khongchai"
                >
                  <u>
                    <b> GitHub</b>
                  </u>
                </Link>
                . Thanks!
              </Text>
            </Box>
            <Stack
              opacity={[0.8, null, null, 1]}
              gridArea="1/1"
              zIndex="5"
              marginLeft="auto"
            >
              <StaticImage
                id="khong-image"
                src="../images/khong-banner.png"
                alt="Author's image"
                layout="constrained"
                placeholder="blurred"
                width={500}
              />
            </Stack>
          </Grid>
          <Line
            dotPos="bottom"
            extraMarginTop="5rem"
            extraMarginBottom="3rem"
          />
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
          {hoveredComponentName ? (
            <TechNameCard hoveredComponentName={hoveredComponentName} />
          ) : null}
          <Stack spacing="6rem" textAlign="center" id="tech">
            <TechSection
              title="Front"
              techTitles={technologiesData?.getTechnologiesAssignedToRole.front.map(
                (front) => front?.title
              )}
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />

            <TechSection
              title="Back"
              techTitles={technologiesData?.getTechnologiesAssignedToRole.back.map(
                (back) => back?.title
              )}
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <TechSection
              title="Hosting"
              techTitles={technologiesData?.getTechnologiesAssignedToRole.hosting.map(
                (hosting) => hosting?.title
              )}
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
            <TechSection
              title="Languages"
              techTitles={languages?.map((lang) => lang.title)}
              fetching={fetchingTechnologies}
              setHoverComponentName={setHoverComponentName}
            />
          </Stack>
          <Line dotPos="top" extraMarginTop="5rem" extraMarginBottom="3rem" />
        </Stack>
      </GridContainer>
      <Box mb={`calc(${small} + 4rem)`}>
        <ProjectHighlightsSection />
      </Box>
      <Box css={{ "> *": { marginTop: "2rem" } }}>
        <AboutMeBanner />
        <ResumeDownloadSection />
        <Button
          bg="black"
          border="1px solid white"
          as={Link}
          title="webring (วงแหวนเว็บ)"
          href="https://webring.wonderful.software#khong.xyz"
          width="32px"
          height="32px"
          p="2rem"
          target="_blank"
          display="block"
          margin="0 auto"
          position="relative"
          _hover={{ filter: "invert(1)" }}
          transition=".3s"
        >
          <Image
            transition=".3s"
            _hover={{ filter: "" }}
            position="absolute"
            left="0"
            right="0"
            bottom="0"
            top="0"
            margin="auto"
            maxWidth="32px"
            alt="webring (วงแหวนเว็บ)"
            width="32px"
            filter="invert(1)"
            src="https://webring.wonderful.software/webring.black.svg"
          />
        </Button>
      </Box>
    </>
  );
};
export default IndexPage;
