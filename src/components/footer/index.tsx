import { Box, Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { navItems } from "../../constants/navItems";

interface indexProps {}

type ContactItem = {
  label: string;
  href: string;
};

export const Footer: React.FC<indexProps> = ({}) => {
  const contactItems: Array<ContactItem> = [
    {
      label: "World1955@hotmail.com",
      href: `mailto:world1955@hotmail.com`,
    },
    {
      label: "Github",
      href: "https://github.com/Khongchai",
    },
    {
      label: "Linkedin",
      href:
        "https://www.linkedin.com/in/khongchai-greesuradej-616141103/?originalSubdomain=en",
    },
  ];
  return (
    <Grid mt="5rem">
      <StaticImage
        src="../../images/footer-background.png"
        alt="footerImg"
        height={600}
        layout="constrained"
        objectPosition="left center"
        style={{ gridArea: "1/1", opacity: 0.25 }}
      ></StaticImage>
      <Flex
        gridArea="1/1"
        width="100%"
        src="../../images/footer-background.png"
        padding={["5rem 1rem 10rem 1rem", null, null, "5rem 0 10rem 0"]}
        css={{ " > *": { marginRight: "1.5rem" } }}
        maxWidth="1800px"
        margin="0 auto"
        position="relative"
        flexDir={["column", null, null, "row"]}
      >
        <Box id="contact" flex="0.2" mb="1rem">
          <Heading w="fit-content" ml={["unset", null, null, "auto"]} size="lg">
            CONTACT
          </Heading>
        </Box>
        <Box flex="0.5" mb="2rem">
          {contactItems.map((item) => {
            return (
              <Box mb="1rem" key={item.label}>
                <Heading
                  as={Link}
                  fontFamily="proxima nova lt"
                  href={item.href}
                  size="sm"
                  target="_blank"
                  fontWeight="300"
                >
                  {item.label}
                </Heading>
              </Box>
            );
          })}
        </Box>
        <Box flex="0.3">
          {navItems.map((item) => {
            if (item.label.toLowerCase() === "contact") return;
            return (
              <Box key={item.label} mb="1rem">
                <Heading
                  as={GatsbyLink}
                  key={item.label}
                  to={item.href}
                  fontFamily="proxima nova lt"
                  size="sm"
                  target="_blank"
                  fontWeight="300"
                >
                  {item.label}
                </Heading>
              </Box>
            );
          })}
        </Box>
      </Flex>
    </Grid>
  );
};
