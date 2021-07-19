export default function getExtraDayOffset(
  projectBeginDay: number,
  oneMonthLengthInPixel: string
) {
  //assume all month has 31 days for simplicity sake.
  const daysInMonth = 31;
  const offsetRight =
    (parseInt(oneMonthLengthInPixel) * projectBeginDay) / daysInMonth;
  return `${Math.floor(offsetRight)}px`;
}
