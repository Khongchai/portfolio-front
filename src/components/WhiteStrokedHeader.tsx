import React from "react";
import { Heading } from "@chakra-ui/react";

interface WhiteStrokedHeaderProps {
  textAlign?: any;
}

export const WhiteStrokedHeader: React.FC<WhiteStrokedHeaderProps> = ({
  textAlign,
  children,
}) => {
  return (
    <Heading
      textAlign={textAlign ? textAlign : null}
      css={{
        WebkitTextFillColor: "black",
        WebkitTextStrokeColor: "white",
        WebkitTextStrokeWidth: "0.8px",
      }}
      fontFamily="proxima nova lt"
      fontSize="3rem"
      letterSpacing="5px"
      color="black"
      fontWeight={600}
    >
      {children}
    </Heading>
  );
};
