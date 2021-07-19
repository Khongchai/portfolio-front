import { Flex, Box, Text } from "@chakra-ui/react";
import React from "react";
const Years: React.FC<{
  years: number[];
}> = ({ years }) => {
  return (
    <>
      {years.map((year) => {
        return (
          <Flex flexDir="column" gridColumn="span 12" key={year}>
            <Box
              as="span"
              className="circle"
              position="relative"
              bgColor="#C4C4C4"
              width="14px"
              height="14px"
              borderRadius="50%"
              ml="0.5px" //value of the black left border between each year
              transform="translateY(-50%) translateX(-50%)"
            ></Box>
            <Box
              width="fit-content"
              transform="translateX(calc(-50% + 7px))"
              as="span"
              key={year}
            >
              <Text id={`year-${year}-element`} className="year-elements">
                {year}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </>
  );
};

export default Years;
