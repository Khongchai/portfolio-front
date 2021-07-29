import React from "react";
import MathJax from "react-mathjax2";
import { Box } from "@chakra-ui/react";

interface MathJaxProps {
  mathExpression: string;
}

const MathExpression: React.FC<MathJaxProps> = ({ mathExpression }) => {
  return (
    <Box fontSize="2xl" textAlign="center">
      <div>
        <MathJax.Context input="ascii">
          <div>
            <MathJax.Node>{mathExpression}</MathJax.Node>
          </div>
        </MathJax.Context>
      </div>
    </Box>
  );
};

export default MathExpression;
