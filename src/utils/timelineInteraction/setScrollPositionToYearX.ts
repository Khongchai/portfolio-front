export default function setScrollPositionToYearX(
  yearXElement: HTMLElement,
  eventsContainer: HTMLElement
) {
  const yearXElementPosition = yearXElement.getBoundingClientRect().left;
  eventsContainer.style.transition = "transform .5s";
  eventsContainer.style.transform = `translateX(-${yearXElementPosition}px)`;
}
