import { Box, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import { navItems } from "../constants/navItems";
import { GridContainer } from "../elements/GridContainer";
import { WobblyThreejs } from "./splashScreen/WobblyThreejs";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <GridContainer width="100%" height="100%" padding="2rem 0">
      <Flex gridColumn="content-begin / content-end" align="center">
        <Box w="100px" h="100px"></Box>
        <Text mr="auto" padding="1rem 2rem">
          KHONGCHAI.G
        </Text>
        {navItems.map((item) => {
          return (
            <Button
              textDecor="none !important"
              as={Link}
              borderRadius="none"
              to={item.href}
              fontWeight="thin !important"
              background="black"
              padding="1rem 2rem"
            >
              {item.label}
            </Button>
          );
        })}
      </Flex>
    </GridContainer>
  );
};
