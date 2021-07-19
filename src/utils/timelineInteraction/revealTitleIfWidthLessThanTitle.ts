export default function revealTitleIfWidthLessThanTitle(projId: string) {
  const proj = document.getElementById(projId);
  const projTitle = document.getElementById(`${projId}-title`);

  if (proj && projTitle) {
    const projComputedStyle = window.getComputedStyle(proj);
    const projWidth = parseInt(projComputedStyle.getPropertyValue("width"));
    const projXPadding =
      parseInt(projComputedStyle.getPropertyValue("padding-left")) +
      parseInt(projComputedStyle.getPropertyValue("padding-right"));
    const titleWidth = parseInt(
      window.getComputedStyle(projTitle).getPropertyValue("width")
    );

    const extraRightPadding = 10;

    if (projWidth - projXPadding < titleWidth) {
      proj.style.width = `${projWidth}px`;
      if (!proj.getAttribute("originalWidht")) {
        proj.setAttribute("originalWidth", String(projWidth));
      }
      setTimeout(() => {
        proj.style.width = `${titleWidth + projXPadding + extraRightPadding}px`;
      }, 10);
    }
  }
}
