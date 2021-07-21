import { Box, Flex, Grid, Input, Select, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  ProjectEntity,
  useAllProjectsNotPaginatedQuery,
  useProjectsQuery,
} from "../../generated/graphql";
import { GridContainer } from "../elements/GridContainer";
import { WhiteStrokedHeader } from "../components/shared/WhiteStrokedHeader";
import ProjectSelector from "../components/ProjectSelector";
import { Paginator } from "../utils/Paginator";
import { SelectedProjectDetails } from "../components/SelectedProjectDetails";
import useSetDefaultSelection from "../utils/hooks/useSetDefaultSelection";
import Timeline from "../components/Timeline";
import { SearchComponent } from "../components/SearchComponent";
import { ProjectsSearchParam } from "../sharedTypes/ProjectsSearchParam";

interface indexProps {}

var paginator: Paginator | undefined;

const index: React.FC<indexProps> = ({}) => {
  const [{ data: unpaginatedProjects }] = useAllProjectsNotPaginatedQuery();

  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(
    null
  );

  ///////////////////////////////////////////////////////////////////

  const [searchParams, setSearchParams] = useState<ProjectsSearchParam>({
    search: undefined,
    sortBy: "Date",
    order: "ASC",
  });
  const [queryVariables, setQueryVariables] = useState({
    skip: 0,
    limit: 8,
    //initial value is the searchParams' initial value
    ...searchParams,
  });
  const [{ data: paginatedProjects }] = useProjectsQuery({
    variables: { ...queryVariables },
  });

  useEffect(() => {
    {
      setQueryVariables({
        skip: queryVariables.skip,
        limit: queryVariables.limit,
        ...searchParams,
      });
    }
  }, [searchParams]);

  function paginateForward() {
    setQueryVariables({
      ...queryVariables,
      skip: queryVariables.skip + queryVariables.limit,
    });
  }

  function paginateBackward() {
    setQueryVariables({
      ...queryVariables,
      skip: queryVariables.skip - queryVariables.limit,
    });
  }

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
          <SearchComponent searchParams={{ searchParams, setSearchParams }} />
          <Box id="project-items-container" position="relative">
            {paginatedProjects ? (
              <ProjectSelector
                paginateBackward={paginateBackward}
                paginateForward={paginateForward}
                projects={paginatedProjects.projects.projects}
                positions={{
                  isFirst: paginatedProjects.projects.isFirstQuery,
                  isLast: paginatedProjects.projects.isLastQuery,
                }}
                setSelectedProject={setSelectedProject}
              />
            ) : null}
          </Box>
          {paginator ? (
            <Text textAlign="center">
              Page: TODO, use the skip variable to calculate page position
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
