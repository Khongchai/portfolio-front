import { Select } from "@chakra-ui/react";
import React from "react";

export const StyledSelect: React.FC<{
  options: string[];
  setFunction: any;
}> = ({ options, setFunction }) => {
  return (
    <Select
      focusBorderColor="none"
      border="none"
      bgColor="#1F1F1F"
      width={"100%"}
      w="fit-content"
      onChange={(e) => {
        setFunction(e.target.value as any);
      }}
    >
      {options.map((option) => (
        <option key={option} style={{ color: "black" }} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
