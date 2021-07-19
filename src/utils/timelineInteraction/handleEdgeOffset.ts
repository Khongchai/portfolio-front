import setScrollPositionToYearX from "./setScrollPositionToYearX";
import getThrottledOffset from "./getThrottledOffset";

export default function handleEdgeOffset(
  offsetX?: number,
  checkOnlyOffset?: boolean
): number | void {
  const windowWidth = document.documentElement.clientWidth;
  const timeline = document.getElementById("timeline");
  const timelineRight = timeline?.getBoundingClientRect().right;
  const timelineLeft = timeline?.getBoundingClientRect().left;
  const offRight = offRightCheck(windowWidth, timelineRight!);
  const offLeft = offLeftCheck(timelineLeft!);

  if (!checkOnlyOffset && offsetX) {
    if (timeline && (offRight || offLeft)) {
      return getThrottledOffset(offsetX);
    }
    return offsetX;
  } else {
    if (timeline) {
      if (offRight) {
        resetRightPosition(timeline);
      } else if (offLeft) {
        resetLeftPosition(timeline);
      }
    }
  }
}

function offRightCheck(windowRight: number, timelineRight: number): boolean {
  return windowRight > timelineRight ? true : false;
}

function offLeftCheck(timelineLeft: number): boolean {
  const windowLeft = 0;
  return windowLeft < timelineLeft ? true : false;
}

function resetRightPosition(timeline: HTMLElement) {
  const yearElements = document.getElementsByClassName("year-elements");
  const lastYearElements = yearElements[yearElements.length - 1];
  setScrollPositionToYearX(lastYearElements as HTMLElement, timeline);
}

function resetLeftPosition(timeline: HTMLElement) {
  const year2018Element = document.getElementById("year-2018-element");
  if (year2018Element) {
    setScrollPositionToYearX(year2018Element, timeline);
  }
}
