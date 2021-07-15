import { Box, Heading, UnorderedList, ListItem } from "@chakra-ui/react";
import React from "react";

export const BulletPoints: React.FC<{
  sectionName: string;
  points: string[];
}> = ({ sectionName, points }) => {
  return (
    <Box>
      <Heading mb="0.5rem" size="md" textTransform="capitalize">
        {sectionName}
      </Heading>
      {points.map((point) => {
        return (
          <UnorderedList>
            <ListItem>{point}</ListItem>;
          </UnorderedList>
        );
      })}
    </Box>
  );
};
