import { Flex, Text, Input, Select, Box, Stack } from "@chakra-ui/react";
import React from "react";

interface SearchComponentProps {}

export const SearchComponent: React.FC<SearchComponentProps> = ({}) => {
  return (
    <>
      <Flex
        as={Stack}
        spacing="1rem"
        align="center"
        justifyContent="center"
        flexDir="column"
        width="15.5rem"
        marginLeft="auto !important"
        marginRight="auto !important"
      >
        <Input
          border="none"
          bgColor="#1F1F1F"
          focusBorderColor="none"
          placeholder={`Search Any`}
          width={"100%"}
        />
        <Flex
          align="center"
          width="100%"
          css={{ "> *": { marginLeft: "1rem" } }}
        >
          <Text>Sort</Text>
          <StyledSelect options={["Date", "Title"]} />
          <StyledSelect options={["ASC", "DESC"]} />
        </Flex>
      </Flex>
    </>
  );
};

const StyledSelect: React.FC<{ options: string[] }> = ({ options }) => {
  return (
    <Select
      focusBorderColor="none"
      border="none"
      bgColor="#1F1F1F"
      width={"100%"}
      w="fit-content"
    >
      {options.map((option) => (
        <option style={{ color: "black" }} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
