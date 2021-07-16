import { Box, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAllProjectsNotPaginatedQuery } from "../../../generated/graphql";
import { GridContainer } from "../../elements/GridContainer";
import { WhiteStrokedHeader } from "../shared/WhiteStrokedHeader";
import { StaticImage } from "gatsby-plugin-image";
import ProjectSelector from "./ProjectSelector";
import { Paginator } from "../../utils/Paginator";

interface indexProps {}

var paginator: Paginator | undefined;

const index: React.FC<indexProps> = ({}) => {
  const [
    { fetching, data: unpaginatedProjects },
  ] = useAllProjectsNotPaginatedQuery();

  const [paginatedProjects, setPaginatedProjects] = useState(null);
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

  useEffect(() => {
    if (paginator && paginationDirection) {
      if (paginationDirection.direction === "forward") {
        paginator.paginateForward();
      } else if (paginationDirection.direction === "backward") {
        paginator.paginateBackward();
      } else {
        console.log("pagination direction not set");
      }
      const paginationResult = paginator.getItemsAtCurrent();
      setPaginatedProjects(paginationResult.data);
      setPaginationPosition({
        isFirst: paginationResult.isFirst,
        isLast: paginationResult.isLast,
      });
    }
  }, [paginationDirection]);

  return (
    <GridContainer width="100%" height="100%">
      <Box gridColumn="content-begin / content-end">
        <Stack spacing="3rem" m="3rem 0">
          <WhiteStrokedHeader textAlign="center">
            MY PROJECTS
          </WhiteStrokedHeader>
          <Box id="project-items-container" position="relative">
            {!fetching && paginatedProjects ? (
              <ProjectSelector
                projects={paginatedProjects}
                setPaginationDirection={setPagiantionDirection}
                paginationPosition={paginationPosition}
              />
            ) : null}
          </Box>
        </Stack>
      </Box>
    </GridContainer>
  );
};

export default index;
