import {
  Box,
  Text,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import React from "react";
import { navItems } from "../constants/navItems";
import { desktopLayout, mobileLayout } from "../constants/screenSizes";
import { GridContainer } from "../elements/GridContainer";
import { WobblyThreejs } from "./splashScreen/WobblyThreejs";
import { HamburgerIcon } from "@chakra-ui/icons";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  return (
    <GridContainer width="100%" height="100%" padding="2rem 0">
      <Flex gridColumn="content-begin / content-end" align="center">
        <Flex justify="center" mr="auto" as={Link} to="/" align="center">
          <Box
            id="navbar-wobbly-container"
            w="100px"
            h="100px"
            cursor="pointer"
          >
            <WobblyThreejs canvasId="navbar-wobbly" />
          </Box>
          <Text
            mr="auto"
            fontFamily="proxima nova lt"
            fontWeight="600"
            p={["1rem 0.4rem", null, "1rem 0.7rem", "1rem 2rem"]}
            paddingLeft="0 !important"
            fontSize={["0.925rem", null, "1rem"]}
          >
            KHONGCHAI.G
          </Text>
        </Flex>
        {navItems.map((item) => {
          return (
            <Button
              key={item.label}
              textDecor="none !important"
              as={Link}
              borderRadius="none"
              to={item.href}
              fontFamily="Proxima Nova lt"
              background="black"
              height="fit-content"
              mr="3rem"
              fontWeight="300"
              p="0.75rem"
              _hover={{ background: "unset" }}
              display={desktopLayout}
            >
              {item.label}
            </Button>
          );
        })}
        <Menu>
          <MenuButton
            display={mobileLayout}
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            zIndex="5"
            position="relative"
            width="54px"
          />
          <MenuList
            zIndex="5"
            position="relative"
            css={{ "* + *": { marginTop: "0.75rem" } }}
          >
            {navItems.map((item) => {
              return (
                <MenuItem
                  key={item.label}
                  as={Link}
                  to={item.href}
                  fontFamily="Proxima Nova lt"
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </Flex>
    </GridContainer>
  );
};
