import { Box, Grid } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AllProjectsNotPaginatedQuery,
  ProjectEntity,
  ProjectsQuery,
} from "../../../generated/graphql";
import removeDuplicatesFromArray from "../../utils/removeDuplicatesFromArray";
import { GridRowPos } from "../../utils/timelineInteraction/Grid/gridRowPos";
import manageBlockMove from "../../utils/timelineInteraction/manageBlockMove";
import setFocusOnChange from "../../utils/timelineInteraction/setFocusOnChange";
import setScrollPositionToYearX from "../../utils/timelineInteraction/setScrollPositionToYearX";
import ProjectAsTimelineEvent from "./ProjectAsTimelineEvent";
import Years from "./Years";

interface TimelineProps {
  data: ProjectsQuery | undefined;
  setSelectedProject: React.Dispatch<
    React.SetStateAction<ProjectEntity | null>
  >;
  selectedProject: ProjectEntity | null;
}

/**
 * Inspired by: https://voyager.jpl.nasa.gov/mission/timeline/#event-a-once-in-a-lifetime-alignment
 */
const Timeline: React.FC<TimelineProps> = ({
  data,
  setSelectedProject,
  selectedProject,
}) => {
  const years: number[] = useMemo(() => {
    if (!data) return [];

    const allYears = data?.projects.projects.map((proj) =>
    //date format = yyyy-mm-dd
    {
      const [yearStart] = proj.startDate.split("-");
      return parseInt(yearStart);
    }
    );
    const allYearsNoDuplicates: number[] = removeDuplicatesFromArray(allYears).sort();
    //add an extra year at the end and the beginning just for looks
    return [
      allYearsNoDuplicates[0] - 1,
      ...allYearsNoDuplicates,
      allYearsNoDuplicates[allYearsNoDuplicates.length - 1] + 1,
    ];
  }, []);

  const [lastEventRendered, setLastEventRendered] = useState<boolean>(false);
  const oneMonthLengthInPixels = "55px";
  const twelveMonths = 12;
  const gridTemplateColumns = `repeat(${years.length * twelveMonths
    }, ${oneMonthLengthInPixels})`;

  const [gridRowPos, setGridRowPos] = useState<GridRowPos>([]);
  const yearElemToSetInitialScrollToRef = useRef<null | HTMLElement>(null);

  useEffect(() => {
    manageBlockMove("timeline", "monitor");
    return () => {
      manageBlockMove("timeline", "de-monitor");
    };
  }, []);

  useEffect(() => {
    if (lastEventRendered) {
      setFocusOnChange(
        String(selectedProject?.id),
        `${selectedProject?.id}-time-indicator`
      );
    }
  }, [lastEventRendered, selectedProject]);

  useEffect(() => {
    const timeline = document.getElementById("timeline");
    if (timeline && yearElemToSetInitialScrollToRef.current !== null) {
      setScrollPositionToYearX(
        yearElemToSetInitialScrollToRef.current,
        "end"
      );
    }
  }, [yearElemToSetInitialScrollToRef.current]);
  return (
    <Grid
      cursor="grab"
      onMouseDown={(e: any) => {
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e: any) => {
        e.target.style.cursor = "grab";
      }}
      minWidth="1200px"
      minHeight={["300px", null, "320px"]}
      id="timeline-container"
    >
      <Grid
        id="timeline"
        gridTemplateRows="[timeline-top] 0.78fr [timeline-bottom] 0.22fr [timeline-padding-bottom]"
      >
        <Grid
          borderBottom="1px solid"
          css={{
            borderImageSlice: "1",
            borderImageSource:
              "linear-gradient(270deg, #000000 0%, #858294 2.72%, #858294 49.76%, #858294 95.06%, #000000 97.07%);",
          }}
          id="events-container"
          gridRow="timeline-top / timeline-bottom"
          flexDir="row"
          rowGap={["0.3em", null, "0.7rem", null, "1.3rem"]}
          gridTemplateColumns={gridTemplateColumns}
          //number of row is arbitrary (as long as there is enough)
          gridTemplateRows={`[events-container-top] ${gridRowPos.map(() => "1fr").join(" ")} [events-container-bottom]`}
        >
          {data?.projects?.projects.map((proj, i) => {
            return (
              <ProjectAsTimelineEvent
                setLastEventRendered={setLastEventRendered}
                setSelectedProject={setSelectedProject}
                project={proj}
                isLastProj={
                  data?.projects?.projects.length - 1 === i ? true : false
                }
                oneMonthLengthInPixels={oneMonthLengthInPixels}
                firstYearInTimeline={years[0]}
                key={proj.title}
                gridRowPos={gridRowPos}
                setGridRowPos={setGridRowPos}
              />
            );
          })}

          {years.map((year: number, i) => {
            return (
              <Box
                //the specificity locks these elements to the defined grid;
                //prevents them from being pushed around
                //now you can overlay anything over them
                ref={
                  year === 2019
                    ? yearElemToSetInitialScrollToRef
                    : (null as any)
                }
                className="year-borders"
                w="1px"
                borderLeft="1px solid #828282"
                zIndex="0"
                gridColumn={`${12 * i + 1} / span 12`}
                gridRow={`1 / span ${gridRowPos.length}`}
                key={`${year}border`}
                position="relative"
              />
            );
          })}
        </Grid>
        <Grid id="years-container" gridTemplateColumns={gridTemplateColumns}>
          <Years years={years} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Timeline;
