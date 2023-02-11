import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { setSelectedProjectAndUpdateUrlParamAndLocalStorage } from "../../utils/SetSelectedProjectAndUpdateUrlParam";
import { Chevron } from "./Chevron";
import { ProjectItem } from "./ProjectItem";

interface ProjectSelectorProps {
  projects: ProjectEntity[];
  setSelectedProject: Dispatch<SetStateAction<ProjectEntity | null>>;
  paginateForward: () => void;
  paginateBackward: () => void;
  positions: { isFirst: boolean; isLast: boolean };
  noProjectsFromSearch: boolean;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  setSelectedProject,
  paginateForward,
  paginateBackward,
  positions,
  noProjectsFromSearch,
}) => {
  return (
    <Box overflow="visible" position="relative" margin="0 auto" width={["unset", null, null, null, "fit-content"]}>
      <Chevron
        onClickFunction={() => {
          paginateBackward();
        }}
        direction="left"
        disabled={positions.isFirst}
      />
      <Flex overflow="hidden">
        <Box
          padding="3rem 0"
          gap="8px"
          className="nice-looking-scroll"
          id="project-selectors-container"
          overflowX={["scroll", null, null, null, "initial"]}
          overflowY={["hidden", null, null, null, "initial"]}
          position="relative"
          placeItems="center"
          marginLeft="auto"
          marginRight="auto"
          display={["flex", null, null, null, "grid"]}
          gridTemplateRows={"200px 200px"}

          gridTemplateColumns={`repeat(4, 200px)`}
        >
          {noProjectsFromSearch ? (
            <Text textAlign="center" gridColumn="1/-1">
              No projects found
            </Text>
          ) : (
            <>
              {projects.map((project) => (
                <ProjectItem
                  key={project.title}
                  imgLink={project.tinyImgLink ?? ""}
                  title={project.title}
                  onClickFunction={() => {
                    setSelectedProjectAndUpdateUrlParamAndLocalStorage(
                      setSelectedProject,
                      project
                    );
                  }}
                />
              ))}
            </>
          )}
        </Box>
      </Flex>
      <Chevron
        direction="right"
        onClickFunction={() => {
          paginateForward();
        }}
        disabled={positions.isLast}
      />
    </Box>
  );
};

export default ProjectSelector;
