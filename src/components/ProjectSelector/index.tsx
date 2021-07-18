import { Flex, Grid } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import { setSelectedProjectAndUpdateUrlParam } from "../../utils/SetSelectedProjectAndUpdateUrlParam";
import { Chevron } from "./Chevron";
import { ProjectItem } from "./ProjectItem";

interface ProjectSelectorProps {
  projects: ProjectEntity[];
  setPaginationDirection: Dispatch<
    SetStateAction<{ direction: "forward" | "backward" | null; forcer: any }>
  >;
  paginationPosition: { isFirst: boolean; isLast: boolean };
  setSelectedProject: Dispatch<SetStateAction<ProjectEntity | null>>;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  setPaginationDirection,
  paginationPosition,
  setSelectedProject,
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
        display={["flex", null, null, "grid"]}
        gridTemplateRows={squareSide + " " + squareSide}
        gridTemplateColumns={`repeat(4, ${squareSide})`}
      >
        <Chevron
          onClickFunction={() => {
            setPaginationDirection({
              direction: "backward",
              forcer: Math.random(),
            });
          }}
          direction="left"
          hide={paginationPosition.isFirst ? true : false}
        />
        {projects.map((project) => (
          <ProjectItem
            key={project.title}
            imgLink={project.tinyImgLink}
            title={project.title}
            onClickFunction={() => {
              setSelectedProjectAndUpdateUrlParam(setSelectedProject, project);
            }}
          />
        ))}
        <Chevron
          direction="right"
          onClickFunction={() => {
            setPaginationDirection({
              direction: "forward",
              forcer: Math.random(),
            });
          }}
          hide={paginationPosition.isLast ? true : false}
        />
      </Grid>
    </Flex>
  );
};

export default ProjectSelector;
