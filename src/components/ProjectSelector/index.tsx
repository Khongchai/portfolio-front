import { Flex, Grid, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { ProjectsSearchParam } from "../../sharedTypes/ProjectsSearchParam";
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
  const squareSide = "200px";

  return (
    <Flex overflow="hidden">
      <Grid
        className="nice-looking-scroll"
        id="project-selectors-container"
        overflowX={["scroll", null, null, "initial"]}
        overflowY={["hidden", null, null, "initial"]}
        position="relative"
        margin="0 auto"
        placeItems="center"
        pb={["1rem", null, null, 0]}
        display={["flex", null, null, "grid"]}
        gridTemplateRows={squareSide + " " + squareSide}
        gridTemplateColumns={`repeat(4, ${squareSide})`}
      >
        {noProjectsFromSearch ? (
          <Text textAlign="center" gridColumn="1/-1">
            No projects found
          </Text>
        ) : (
          <>
            <Chevron
              onClickFunction={() => {
                paginateBackward();
              }}
              direction="left"
              hide={positions.isFirst}
            />
            {projects.map((project) => (
              <ProjectItem
                key={project.title}
                imgLink={project.tinyImgLink}
                title={project.title}
                onClickFunction={() => {
                  setSelectedProjectAndUpdateUrlParamAndLocalStorage(
                    setSelectedProject,
                    project
                  );
                }}
              />
            ))}
            <Chevron
              direction="right"
              onClickFunction={() => {
                paginateForward();
              }}
              hide={positions.isLast}
            />
          </>
        )}
      </Grid>
    </Flex>
  );
};

export default ProjectSelector;
