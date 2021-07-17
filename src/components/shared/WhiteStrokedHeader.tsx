import React from "react";
import { Heading } from "@chakra-ui/react";

interface WhiteStrokedHeaderProps {
  textAlign?: any;
}

const _WhiteStrokedHeader: React.FC<WhiteStrokedHeaderProps> = ({
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
      fontSize={["2rem", null, null, "3rem"]}
      letterSpacing="5px"
      color="black"
      fontWeight={600}
    >
      {children}
    </Heading>
  );
};

export const WhiteStrokedHeader = React.memo(
  _WhiteStrokedHeader
) as React.FC<WhiteStrokedHeaderProps>;
