import { Box } from "@chakra-ui/react";
import React from "react";
import { ProjectEntity } from "../../generated/graphql";
import ProjectDetails from "./shared/ProjectDetails";

interface SelectedProjectDetailsProps {
  selectedProject: ProjectEntity | null;
}

export const SelectedProjectDetails: React.FC<SelectedProjectDetailsProps> = ({
  selectedProject,
}) => {
  return (
    <Box>
      <ProjectDetails project={selectedProject} noGrayScale={true} />
    </Box>
  );
};
