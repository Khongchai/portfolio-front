import { Flex, Grid, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { RunningBordersBT, RunningBordersLR } from "../shared/RunningBorder";

interface ProjectItemProps {
  imgLink?: string;
  title: string;
  onClickFunction?: () => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  imgLink,
  title,
  onClickFunction,
}) => {
  const sideLength = ["125px", null, "145px", null, "160px"]

  return (
    <Flex
      className="project-items"
      textAlign="center"
      _hover={{ cursor: "pointer" }}
      align="center"
      id={`project-item-${title}`}
      flexDir="column"
      position="relative"
      onClick={() => {
        onClickFunction();
      }}
      data-cy="project-item"
    >
      <Grid
        minHeight={sideLength}
        minWidth={sideLength}
        width={sideLength}
        height={sideLength}
        mb="1rem"
        bgColor="black"
        position="relative"
        placeItems="center"
        //Extra margin for the running borders
        p="6px"
      >
        <Grid
          width="100%"
          height="100%"
          bgColor="black"
          backgroundImage={imgLink ? `url(${imgLink})` : ""}
          backgroundPosition="center"
          backgroundRepeat="none"
          backgroundSize="cover"
          gridArea="1/1"
          className={title + "tiny-img"}
        />
        <RunningBordersLR>
          <RunningBordersBT />
        </RunningBordersLR>
        {imgLink ? null : (
          <Text gridArea="1/1" transform="rotate(-45deg)">
            No Preview Img
          </Text>
        )}
      </Grid>

      <Heading fontSize={["0.75rem", "0.85rem", "0.85rem", "0.85rem"]} textTransform="capitalize">
        {title}
      </Heading>
    </Flex>
  );
};
