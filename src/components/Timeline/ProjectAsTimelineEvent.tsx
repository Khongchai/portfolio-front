import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo } from "react";
import { ProjectEntity } from "../../../generated/graphql";
import {
  removeProjectAndIndicatorFocusColor,
  setProjectAndIndicatorFocusColor,
} from "../../utils/timelineInteraction/setFocusOnHover";
import { setSelectedProjectAndUpdateUrlParamAndLocalStorage } from "../../utils/SetSelectedProjectAndUpdateUrlParam";
import { getGridColumnLength } from "../../utils/timelineInteraction/Grid/getGridColumnLength";
import { getGridRow } from "../../utils/timelineInteraction/Grid/getGridRow";
import { GridRowPos } from "../../utils/timelineInteraction/Grid/gridRowPos";
import getExtraDayOffset from "../../utils/timelineInteraction/getExtraDayOffset";
import revealTitleIfWidthLessThanTitle from "../../utils/timelineInteraction/revealTitleIfWidthLessThanTitle";
import resetWidthIfWidthNotOriginal from "../../utils/timelineInteraction/resetWidthIfWidthNotOriginal";

const ProjectAsTimelineEvent: React.FC<{
  project: ProjectEntity;
  firstYearInTimeline: number;
  gridRowPos: GridRowPos;
  oneMonthLengthInPixels: string;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
  setLastEventRendered: React.Dispatch<React.SetStateAction<boolean>>;
  isLastProj: boolean;
}> = ({
  firstYearInTimeline,
  oneMonthLengthInPixels,
  project,
  gridRowPos,
  setSelectedProject,
  setLastEventRendered,
  isLastProj,
}) => {
    useEffect(() => {
      if (isLastProj) {
        setLastEventRendered(true);
      }
    }, []);

    const projectEndDate = {
      month: parseInt(project.endDate?.split("-")[1] as any),
      year: parseInt(project.endDate?.split("-")[0] as any),
    };
    const projectBeginDate = {
      month: parseInt(project.startDate.split("-")[1]),
      year: parseInt(project.startDate.split("-")[0]),
    };
    const projectStartYear = parseInt(project?.startDate.split("-")[0]);
    const numberOfMonths = 12;
    const firstColumnPosition = 1;
    const gridColumnBeginPosition = useMemo(
      () =>
        (projectStartYear - firstYearInTimeline) * numberOfMonths +
        firstColumnPosition +
        projectBeginDate.month,
      []
    );
    const gridColumnLength = useMemo(
      () => getGridColumnLength(projectBeginDate, projectEndDate, project.title),
      []
    );
    const gridRow = useMemo(
      () =>
        getGridRow(
          gridColumnBeginPosition,
          gridColumnBeginPosition + gridColumnLength,
          gridRowPos,
          project.title
        ),
      []
    );

    const projectBeginDay = parseInt(project.startDate.split("-")[2]);
    const extraDayOffsetInPixels = useMemo(
      () => getExtraDayOffset(projectBeginDay, oneMonthLengthInPixels),
      []
    );

    const projIdAsString = `${project.id}`;

    return (
      <>
        <Box
          gridRow={`${gridRow} / events-container-bottom`}
          gridColumn={gridColumnBeginPosition}
          width="2px"
          transform={`translateX(${extraDayOffsetInPixels})`}
          bgColor="#828282"
          className="project-event-time-indicator"
          id={`${projIdAsString}-time-indicator`}
          data-cy="project-as-timeline-event"
        />
        <Flex
          id={projIdAsString}
          className="project-events"
          bg="#2C2B2B"
          onMouseOver={() => {
            setProjectAndIndicatorFocusColor(projIdAsString);
            revealTitleIfWidthLessThanTitle(projIdAsString);
          }}
          onMouseOut={() => {
            removeProjectAndIndicatorFocusColor(projIdAsString);
            resetWidthIfWidthNotOriginal(projIdAsString);
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProjectAndUpdateUrlParamAndLocalStorage(
              setSelectedProject,
              project
            );
          }}
          zIndex="2"
          transform={`translateX(${extraDayOffsetInPixels})`}
          gridColumn={`${gridColumnBeginPosition} / span ${gridColumnLength}`}
          transition="width .1s"
          gridRow={gridRow}
          placeItems={"center"}
          borderRadius="0 8px 8px 0"
          overflow="hidden"
          fontSize="0.9rem"
          p="0.1em 0.3em 0.1em 1em"
          cursor="pointer"
        >
          <Text
            pointerEvents="none"
            className="project-event-title"
            id={`${projIdAsString}-title`}
          >
            {project.title}
          </Text>
        </Flex>
      </>
    );
  };

export default ProjectAsTimelineEvent;
