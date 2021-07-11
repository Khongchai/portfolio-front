import { useEffect } from "react";

export default function useHoverComponent(
  hoverComponentName: string | undefined
) {
  useEffect(() => {
    let logo: HTMLElement;
    if (hoverComponentName) {
      logo = document.getElementById(hoverComponentName)!;
      const infoCard = document.getElementById("info-card")!;
      const logoLeft = logo.getBoundingClientRect().left;
      const logoTop = logo.getBoundingClientRect().top;
      const logoHeight = parseInt(
        window.getComputedStyle(logo).getPropertyValue("height")
      );
      const logoWidth = parseInt(
        window.getComputedStyle(logo).getPropertyValue("width")
      );
      infoCard.style.left = `${logoLeft + logoWidth / 2}px`;
      infoCard.style.top = `${logoTop - logoHeight - 30}px`;
    }
  }, [hoverComponentName]);
}
