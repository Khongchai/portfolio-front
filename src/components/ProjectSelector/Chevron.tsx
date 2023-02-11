import { ChevronUpIcon } from "@chakra-ui/icons";
import { Box, BoxProps, IconButton } from "@chakra-ui/react";
import React from "react";

export const Chevron: React.FC<{
  direction: string;
  onClickFunction: () => void;
  disabled: boolean;
}> = ({ direction, onClickFunction, disabled, }) => {
  const transform = direction === "right" ? "rotate(90deg)" : "rotate(-90deg)";
  const pixelWidth = 30;
  return (
    <Box
      onClick={() => {
        if (!disabled) {
          onClickFunction();
        }
      }}
      position="absolute"
      zIndex="9999"
      right={direction === "right" ? ["35%", null, null, `calc(-${pixelWidth}px - 1.25rem)`] : "unset"}
      left={direction === "left" ? ["35%", null, null, `calc(-${pixelWidth}px - 1.25rem)`] : "unset"}
      top={["calc(100% + 1rem)", null, null, "50%"]}
      transition=".12s"
      cursor="pointer"
      width="fit-content"
      transformOrigin="center"
      transform={transform}
    >
      <IconButton
        pointerEvents={disabled ? "none" : "all"}
        aria-label='Pagination Chevron'
        background="black"
        _hover={{ background: "linear-gradient(to right, #b891ff, #e45f6b, #f99f35)" }}
        icon={<ChevronUpIcon
          color={disabled ? "grey" : "white"} width={pixelWidth} height="2rem"
          _hover={{ color: "black" }}
        />} />
    </Box>
  );
};
