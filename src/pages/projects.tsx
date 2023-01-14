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
import { SelectedProjectDetails } from "../components/SelectedProjectDetails";
import useSetDefaultSelection from "../utils/hooks/useSetDefaultSelection";
import Timeline from "../components/Timeline";
import { SearchComponent } from "../components/SearchComponent";
import { ProjectsSearchParam } from "../sharedTypes/ProjectsSearchParam";
import { setAsSelected as setProjectItconAsSelected } from "../utils/setAsSelected";

const index: React.FC = () => {
  const [
    { fetching, data: unpaginatedProjects },
  ] = useAllProjectsNotPaginatedQuery();

  const [selectedProject, setSelectedProject] = useState<ProjectEntity | null>(
    null
  );

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

  useEffect(() => {
    if (selectedProject) {
      setProjectItconAsSelected(selectedProject.title);
    }
  }, [selectedProject]);

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
            {!paginatedProjects || fetching ? (
              <Flex justify="center">
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              </Flex>
            ) : (
              <ProjectSelector
                paginateBackward={paginateBackward}
                paginateForward={paginateForward}
                projects={paginatedProjects.projects.projects}
                positions={{
                  isFirst: paginatedProjects.projects.isFirstQuery,
                  isLast: paginatedProjects.projects.isLastQuery,
                }}
                setSelectedProject={setSelectedProject}
                noProjectsFromSearch={
                  ((!fetching &&
                    paginatedProjects.projects.projects.length === 0 &&
                    queryVariables.search) as unknown) as boolean
                }
              />
            )}
          </Box>
        </Stack>
        {selectedProject ? (
          <Box gridColumn={["1/-1", null, null, "content-begin / content-end"]}>
            <SelectedProjectDetails selectedProject={selectedProject} />
          </Box>
        ) : null}
      </GridContainer>
      <Box mt="3rem" display={["none", null, null, "block"]} overflowX="hidden">
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
