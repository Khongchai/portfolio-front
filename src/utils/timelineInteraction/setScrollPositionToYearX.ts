export default function setScrollPositionToYearX(
  eventsContainer: HTMLElement,
  position: "start" | "end",
) {
  eventsContainer.style.transition = "transform .5s";
  const somePadding = 70;
  const pos = position === "start" ? 0 : eventsContainer.offsetWidth - window.innerWidth + somePadding;
  const translateVal = `translateX(-${pos}px)`;
  eventsContainer.style.transform = translateVal;
}


