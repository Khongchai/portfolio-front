export default function setScrollPositionToYearX(
  yearXElement: HTMLElement,
  eventsContainer: HTMLElement
) {
  const yearXElementPosition = yearXElement.getBoundingClientRect().left;
  eventsContainer.style.transition = "transform .5s";
  const translateVal = `translateX(-${yearXElementPosition}px)`;
  eventsContainer.style.transform = translateVal;
}
