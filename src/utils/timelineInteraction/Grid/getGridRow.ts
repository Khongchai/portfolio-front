import React from "react";
import { GridRowPos } from "./gridRowPos";

/**
 * Edge case not supported yet:
 *  1. When the last added project is the oldest, that project will get pushed to row 4.
 */
export function getGridRow(
  nextItemBegin: number,
  nextItemEnd: number,
  gridRowPos: GridRowPos,
  setGridRowPos: React.Dispatch<React.SetStateAction<GridRowPos>>,
  //debug
  title: string
): number {
  const firstRow = 1;

  const setRowPos = (index: number) => {
    setGridRowPos((gridRowPos) => {
      gridRowPos[index] = {
        begin: nextItemBegin,
        end: nextItemEnd,
      }

      return gridRowPos;
    });
  };
  // First item
  if (gridRowPos.length === 0) {
    setRowPos(0);
    return firstRow;
  }

  for (let i = 0; i < gridRowPos.length; i++) {
    const currentBegin = gridRowPos[i].begin;
    const currentEnd = gridRowPos[i].end;
    const isWithinBoundary = (value: number) => {
      return currentBegin <= value && value <= currentEnd;
    }

    const shouldStartANewRow = isWithinBoundary(nextItemBegin) || isWithinBoundary(nextItemEnd);

    if (!shouldStartANewRow) {
      setRowPos(i);
      return i + 1;
    }
  }

  // append
  setRowPos(gridRowPos.length);

  return gridRowPos.length;
}