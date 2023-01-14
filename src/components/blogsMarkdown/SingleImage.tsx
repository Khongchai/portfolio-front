import { Box, Image } from "@chakra-ui/react";
import React from "react";

type SingleImageProps = {
  src: string;
  alt: string;
  overrideWidth?: string;
  className?: string;
} & (
  | {
      noPadding: true;
      bgColor?: never;
    }
  | {
      noPadding: false;
      bgColor?: string;
    }
);

export const SingleImage: React.FC<SingleImageProps> = ({
  src,
  bgColor,
  noPadding,
  alt,
  className,
  overrideWidth,
}) => {
  return (
    <Box
      display="grid"
      placeItems="center"
      width="100%"
      height="fit-content"
      m="2rem 0 2rem 0"
    >
      <Box
        p={noPadding ? "0" : "2rem"}
        bg={bgColor ? bgColor : "#e0d6ff"}
        borderRadius="6px"
      >
        <Image
          className={className}
          src={src}
          title={alt}
          borderRadius={noPadding ? "6px" : "0"}
          alt={alt}
          maxWidth={overrideWidth ? overrideWidth : "400px"}
          width="100%"
          position="relative"
        />
      </Box>
    </Box>
  );
};
