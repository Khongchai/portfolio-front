import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ProjectEntity,
  useAllProjectsNotPaginatedQuery,
} from "../../generated/graphql";
import { GridContainer } from "../elements/GridContainer";
import { WhiteStrokedHeader } from "../components/shared/WhiteStrokedHeader";
import ProjectSelector from "../components/ProjectSelector";
import { Paginator } from "../utils/Paginator";
import { usePagination } from "../utils/hooks/usePagination";
import { SelectedProjectDetails } from "../components/SelectedProjectDetails";
import useSetDefaultSelection from "../utils/hooks/useSetDefaultSelection";
import { Timeline } from "../components/Timeline";

interface indexProps {}

var paginator: Paginator | undefined;

const index: React.FC<indexProps> = ({}) => {
  const [
    { fetching, data: unpaginatedProjects },
  ] = useAllProjectsNotPaginatedQuery();

  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(
    null
  );

  const [paginatedProjects, setPaginatedProjects] = useState<
    ProjectEntity[] | null
  >(null);
  const paginationLimit = 8;
  //forcer can be anything that would force the useEffect to run
  const [paginationDirection, setPagiantionDirection] = useState<{
    direction: "forward" | "backward" | null;
    forcer: any;
  }>(null);
  const [paginationPosition, setPaginationPosition] = useState<{
    isFirst: boolean;
    isLast: boolean;
  }>({ isFirst: true, isLast: false });

  useEffect(() => {
    if (unpaginatedProjects) {
      paginator = new Paginator(
        unpaginatedProjects?.allProjectsNotPaginated,
        paginationLimit,
        0
      );
      const data = paginator.getItemsAtCurrent();
      setPaginatedProjects(data.data);
      setPaginationPosition({ isFirst: data.isFirst, isLast: data.isLast });
    }
  }, [fetching]);

  usePagination(
    paginator,
    paginationDirection,
    setPaginatedProjects,
    setPaginationPosition
  );

  useSetDefaultSelection(
    setSelectedProject,
    unpaginatedProjects?.allProjectsNotPaginated
  );

  return (
    <>
      <GridContainer width="100%" height="100%">
        <Stack
          gridColumn={["1/-1", null, null, "content-begin / content-end"]}
          spacing="3rem"
          m={["3rem 0", null, null, "3rem 3rem"]}
        >
          <WhiteStrokedHeader textAlign="center">
            MY PROJECTS
          </WhiteStrokedHeader>
          <Box id="project-items-container" position="relative">
            {!fetching && paginatedProjects ? (
              <ProjectSelector
                projects={paginatedProjects}
                setPaginationDirection={setPagiantionDirection}
                paginationPosition={paginationPosition}
                setSelectedProject={setSelectedProject}
              />
            ) : null}
          </Box>
          {paginator ? (
            <Text textAlign="center">
              Page: {paginator.getPagePosition().page} /{" "}
              {paginator.getPagePosition().of}
            </Text>
          ) : null}
        </Stack>
        {selectedProject ? (
          <Box gridColumn={["1/-1", null, null, "content-begin / content-end"]}>
            <SelectedProjectDetails selectedProject={selectedProject} />
          </Box>
        ) : null}
      </GridContainer>
      <Box mt="3rem" overflowX="hidden">
        {unpaginatedProjects ? (
          <Timeline
            selectedProject={selectedProject}
            data={unpaginatedProjects}
            setSelectedProject={setSelectedProject}
          />
        ) : null}
      </Box>
    </>
  );
};

export default index;
