import setScrollPositionToYearX from "./setScrollPositionToYearX";
import getThrottledOffset from "./getThrottledOffset";

export default function handleEdgeOffset(
  offsetX?: number,
  checkOnlyOffset?: boolean
): number | undefined {
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
        return 1;
      } else if (offLeft) {
        resetLeftPosition(timeline);
        return 1;
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
  setScrollPositionToYearX(timeline, "end");
}

function resetLeftPosition(timeline: HTMLElement) {
  setScrollPositionToYearX(timeline, "start");
}
