export function setProjectAndIndicatorFocusColor(projTitle: string) {
  const proj = document.getElementById(projTitle);
  const projIndicator = document.getElementById(`${projTitle}-time-indicator`);
  if (proj && projIndicator) {
    proj.classList.add("is-hovered-proj");
    projIndicator.classList.add("is-hovered-proj");
  }
}

export function removeProjectAndIndicatorFocusColor(projId: string) {
  const proj = document.getElementById(projId);
  const projIndicator = document.getElementById(`${projId}-time-indicator`);
  if (proj && projIndicator) {
    proj.classList.remove("is-hovered-proj");
    projIndicator.classList.remove("is-hovered-proj");
  }
}
