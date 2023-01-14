import { Box, Flex, Heading, Stack, Link } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import { ResumeDownloadSection } from "../ResumeDownloadSection";
import { BulletPoints } from "./BulletPoints";
import { Flags } from "./Flags";

export const ResumeInfo: React.FC = () => {
  const software = [
    "VS Code",
    "After Effects",
    "Blender",
    "FL Studio",
    "Adobe Audition",
  ];
  //not pulled from backend because things in resume are things I'm good at, not things I've used
  const technologies = [
    "React",
    "Gatsby",
    "Next.js",
    "Styled-Components",
    "Chakra UI",
    "Three.js",
    "Django",
    "Flask",
    "Express",
    "TypeGraphql",
    "TypeORM",
    "MikroORM",
    "Graphql",
    "Apollo",
    "Docker",
    "Urql",
  ];
  const languages = [
    "HTML, CSS, Javascript",
    "Typescript",
    "Python",
    "Java",
    "C",
  ];
  const workExperience = [
    `ASTRUM(2020): a space-themed interdisciplinary android
      application and website that allows the user to interact with
      rotating binaural sound units in real-time.`,
    `Journeys (2020 - 2021): a Gatsby blog with a custom-made
      timeline and sidebar for easier chronological navigation. Written
      as a part of the undergraduate research.`,
    `TripleAGloves (2021): a website for a glove company in Thailand.`,
    `ECommerce website (2021): a website written with Django and
      Gatsby for selling my music.`,
  ];
  const socialSkills = [
    `Work well with others; have worked with many people of different backgrounds.`,
    `Hard-working`,
    `Quick learner`,
    `Thorough`,
    `Good leader and follower`,
    `Punctual`,
  ];
  const education = [
    `College of Music Mahidol University 2012 - 2015`,
    `Princess Galyani Vadhana Institute of Music 2017 - 2021`,
  ];

  return (
    <Box id="resume-section">
      <Heading size="lg" mb="1.25rem">
        KHONGCHAI GREESURADEJ
      </Heading>
      <Flex
        justifyContent="space-between"
        flexDir={["column", null, null, "row"]}
      >
        <Stack flex="0.7" marginRight="3rem" spacing="1.25rem">
          <Flags />
          <BulletPoints sectionName="software" points={software} />
          <BulletPoints sectionName="technologies" points={technologies} />
          {/* include html css because people might not know without looking at website */}
          <BulletPoints
            sectionName="Programming languages"
            points={languages}
          />
        </Stack>
        <Stack
          flex="1"
          spacing="1.25rem"
          marginTop={["1.25rem", null, null, 0]}
        >
          <BulletPoints sectionName="work experience" points={workExperience} />
          <BulletPoints sectionName="social skills" points={socialSkills} />
          <BulletPoints sectionName="education" points={education} />
          <Box>
            <Heading mb="0.5rem" size="md" textTransform="capitalize">
              Links
            </Heading>
            <Flex
              css={{
                "> *": {
                  marginRight: "1rem",
                  opacity: 0.7,
                  transition: ".3s",
                  ":hover": { opacity: "1" },
                },
              }}
            >
              <Link target="_blank" href="https://github.com/khongchai">
                <StaticImage
                  src="../../images/links-icon/github.svg"
                  alt="github logo"
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/khongchai-greesuradej-616141103/?originalSubdomain=en"
              >
                <StaticImage
                  src="../../images/links-icon/linkedin.svg"
                  alt="linkedin logo"
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.facebook.com/NoSpoonOnlyFork/"
              >
                <StaticImage
                  src="../../images/links-icon/messenger.svg"
                  alt=""
                />
              </Link>
              <Link
                target="_blank"
                href="https://www.youtube.com/channel/UCagev05Hu01B8Q3p3CLFz2A"
              >
                <StaticImage
                  src="../../images/links-icon/youtube.svg"
                  alt="youtube logo"
                />
              </Link>
              <Link
                target="_blank"
                href="https://open.spotify.com/artist/25znyDCY8EmPkMAT5g4oPw"
              >
                <StaticImage
                  src="../../images/links-icon/spotify.svg"
                  alt="spotify logo"
                />
              </Link>
            </Flex>
            <ResumeDownloadSection donotCenter={true} />
          </Box>
        </Stack>
        <Box
          id="empty-space"
          display={["none", null, null, "block"]}
          flex="0.2"
        />
      </Flex>
    </Box>
  );
};
