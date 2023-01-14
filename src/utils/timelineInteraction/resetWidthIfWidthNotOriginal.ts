export default function resetWidthIfWidthNotOriginal(projId: string) {
  const proj = document.getElementById(projId);
  if (proj) {
    const currentProjWidth = parseInt(
      window.getComputedStyle(proj).getPropertyValue("width")
    );

    const originalWidth = proj.getAttribute("originalWidth")
      ? parseInt(proj.getAttribute("originalWidth")!)
      : null;
    if (originalWidth && currentProjWidth > originalWidth) {
      proj.style.width = `${originalWidth}px`;
      proj.removeAttribute("originalWidth");
    }
  }
}
