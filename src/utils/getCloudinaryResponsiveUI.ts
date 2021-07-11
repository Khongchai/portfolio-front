/**
 *
 * Before: "https://res.cloudinary.com/demo/image/upload/turtles.jpg"
 * After: "https://res.cloudinary.com/demo/image/upload/w_70,h_53,c_scale/turtles.jpg"
 *      divide into parts: before upload, the responsive part, and the rest of the url
 */
let containerWidth = 0;
export function getCloudinaryResponsiveUrl(
  cloudinaryUrl: string,
  containerId: string
) {
  const container = document.getElementById(containerId);

  if (!container) {
    return cloudinaryUrl;
  }

  const containerSize = {
    width: container.offsetWidth,
    height: container.offsetHeight,
  };
  /**
   * New url is fetched only if higher resolution is needed, else just keep the already existing one.
   */
  if (containerSize.width < containerWidth) {
    return cloudinaryUrl;
  }
  containerWidth = containerSize.width;

  const responsiveUrl = breakUpUrlIntoThreeParts(cloudinaryUrl, containerSize);
  return responsiveUrl;
}

function breakUpUrlIntoThreeParts(
  url: string,
  containerSize: { width: number; height: number }
) {
  const responsivePart = `/w_${containerSize.width},h_${containerSize.height},c_scale`;
  const splittedUrl = url.split("/");
  let responsiveUrl: null | string = null;
  for (let urlPart of splittedUrl) {
    if (urlPart === "upload") {
      urlPart = urlPart + responsivePart;
    }
    responsiveUrl = responsiveUrl ? responsiveUrl + "/" + urlPart : urlPart;
  }

  return responsiveUrl;
}
