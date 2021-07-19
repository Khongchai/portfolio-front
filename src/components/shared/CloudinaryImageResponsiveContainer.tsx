import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getCloudinaryResponsiveUrl } from "../../utils/getCloudinaryResponsiveUI";

export const CloudinaryResponsiveImage: React.FC<{
  imgLink?: string;
  projectTitle: string;
  imageActualWidth: string;
  imageActualHeight?: string;
}> = ({ imgLink, projectTitle, imageActualWidth, imageActualHeight }) => {
  const id = `${projectTitle}-image-container`;
  const [responsiveImageUrl, setResponsiveImageUrl] = useState<string | null>(
    null
  );
  const [containerSize, setContainerSize] = useState(null);

  useEffect(() => {
    //set current wallpaper
    setResponsiveImageUrl(
      imgLink ? getCloudinaryResponsiveUrl(imgLink, id) : null
    );
    const container = document.getElementById(id);
    //can use either height or width
    setContainerSize(container.offsetHeight);

    //fetch new image if screenresolution increases
    let timeoutHandler: any;
    function handleResize() {
      clearTimeout(timeoutHandler);
      timeoutHandler = setTimeout(() => {
        const container = document.getElementById(id);

        //Only do this if size is different
        if (container) {
          if (container.offsetHeight !== containerSize) {
            setResponsiveImageUrl(getCloudinaryResponsiveUrl(imgLink, id));
          }
        }
        removeEventListener("resize", handleResize);
      }, 100);
    }
    addEventListener("resize", handleResize);
  }, [imgLink]);
  return (
    <Flex
      borderRadius="20px"
      id={id}
      width={[
        `calc(${imageActualWidth} * 0.22)`,
        `calc(${imageActualWidth} * 0.26)`,
        null,
        `calc(${imageActualWidth} * 0.3)`,
      ]}
      height={[
        `calc(${imageActualHeight} * 0.22)`,
        `calc(${imageActualHeight} * 0.26)`,
        null,
        `calc(${imageActualHeight} * 0.3)`,
      ]}
      backgroundImage={`url(${responsiveImageUrl})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="left"
      boxShadow="dark-lg"
      className="fadein"
    />
  );
};
