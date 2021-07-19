let prevVal: number = 0;
let moveValNoThrottling: number | undefined;

export default function getThrottledValue(offsetX: number): number {
  moveValNoThrottling = prevVal - offsetX;
  prevVal = offsetX;

  return offsetX;
}
