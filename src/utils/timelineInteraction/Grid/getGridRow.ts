import { GridRowPos } from "./gridRowPos";

/**
 * Edge case not supported yet:
 *  1. When the last added project is the oldest, that project will get pushed to row 4.
 */
export function getGridRow(
  beginVal: number,
  endVal: number,
  gridRowPos: GridRowPos,
  //debug
  title: string
): number {
  let row: number = 1;
  if (beginVal > gridRowPos.first) {
    gridRowPos.first = endVal;
    row = 1;
  } else if (beginVal > gridRowPos.second) {
    gridRowPos.second = endVal;
    row = 2;
  } else if (beginVal > gridRowPos.third) {
    gridRowPos.third = endVal;
    row = 3;
  } else if (beginVal > gridRowPos.fourth) {
    gridRowPos.fourth = endVal;
    row = 4;
  } else {
    //reset back to first if overlaps
    //preferred solution: create another row
    gridRowPos.first = endVal;
    row = 1;
  }
  return row;
}
