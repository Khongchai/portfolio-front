import { Box } from "@chakra-ui/react";
import React from "react";

export function RunningBordersBT() {
  return <RunningBorder className="running-borders-bt" />;
}

export const RunningBordersLR: React.FC = ({ children }) => {
  return (
    <RunningBorder className="running-borders-lr">{children}</RunningBorder>
  );
};

const RunningBorder: React.FC<{ className: string }> = ({
  className,
  children,
}) => {
  return (
    <Box
      position="absolute"
      height="inherit"
      width="inherit"
      className={`${className}`}
      overflow="hidden"
      zIndex="1"
      opacity="0.9"
      m="0"
      p="0"
    >
      {children}
    </Box>
  );
};
