import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Icon, IconButton } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";

export const Chevron: React.FC<{
  direction: string;
  onClickFunction: () => void;
  hide: boolean;
}> = ({ direction, onClickFunction, hide }) => {
  const transform = direction === "right" ? "rotate(90deg)" : "rotate(-90deg)";
  return (
    <Box
      onClick={() => {
        onClickFunction();
      }}
      display={hide ? "none" : "block"}
      transform={transform}
      position="absolute"
      zIndex="9999"
      right={direction === "right" ? ["50%", null, null, "-4.5rem"] : ["50%", null, null, "calc(100% + 0.5rem)"]}
      top={["calc(100% + 1rem)", null, null, "50%"]}
      transition=".12s"
      cursor="pointer"
      maxWidth={"30px"}
      width="100%"
    >
      <IconButton aria-label='Pagination Chevron' background="black" _hover={{ background: "linear-gradient(to right, #b891ff, #e45f6b, #f99f35)" }} icon={<ChevronUpIcon width="2rem" height="2rem" />} />
    </Box>
  );
};
