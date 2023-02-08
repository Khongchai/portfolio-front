import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";

type TechLogosProps = {
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  techTitles: string[];
  desc?: string;
  noBorder?: boolean;
  noSpace?: boolean;
  uniqueIdentifier?: string;
};
export const TechLogos: React.FC<TechLogosProps> = ({
  techTitles,
  desc,
  setHoverComponentName,
  noBorder,
  noSpace,
  uniqueIdentifier,
}) => {
  //If no technologies provided, return nothing for this field
  if (!techTitles || techTitles.length === 0) {
    return <></>;
  }

  return (
    <Flex
      flex="auto"
      pb={noSpace ? "" : "1rem"}
      mb={noSpace ? "" : "1rem"}
      align="center"
      borderBottom={noBorder ? "" : "1px groove #cfcae2"}
    >
      <Box height="100%">{desc ? <Text>{desc}: </Text> : null}</Box>
      <Flex
        justifyContent="space-evenly"
        flexWrap="wrap"
        className="logo-container"
        data-cy="logo-container"
        w="100%"
        align="center"
      >
        {
          techTitles?.map((title, i) => {
            const nameOriginal = title;
            const name = nameOriginal.toLowerCase();
            const nameNoSpace = name.replace(/[\s\.]+/g, "");
            const src = `/logos/${nameNoSpace}.png`;

            return <ImageWithFallback
              key={`${title + i}`}
              uniqueIdentifier={uniqueIdentifier}
              onMouseOver={(e: any) => {
                setHoverComponentName(e.target.id);
              }}
              onMouseOut={() => {
                setHoverComponentName(undefined);
              }}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
              index={i}
              src={src}
              title={nameOriginal}
            />
          })
        }

      </Flex>
    </Flex>
  );
};

function ImageWithFallback({
  onMouseOver,
  onMouseOut,
  onClick,
  uniqueIdentifier,
  index, src, title,
}: {
  onMouseOver: React.MouseEventHandler<HTMLImageElement> | undefined,
  onMouseOut: React.MouseEventHandler<HTMLImageElement> | undefined,
  onClick: React.MouseEventHandler<HTMLImageElement> | undefined,
  uniqueIdentifier: string | undefined,
  title: string,
  index: number,
  src: string,
}) {
  const [isError, setIsError] = useState(false);

  const onError = (e: any) => {
    // Try to load again but with svg instead of png
    const [path, extension] = e.target.src.split(".") as string[];
    const svg = "svg";
    if (extension !== svg) {
      e.target.src = path + "." + svg;
    } else {
      // If all else fails, fallback to just a text.
      setIsError(true);
    }
  }
  return (
    <Box>
      {
        isError ? <Text padding="8px">{title}</Text> :
          <Img
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            onError={onError}
            _hover={{
              transform: "scale(1.3)",
            }}
            m="1rem"
            filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
            padding={"1px"}
            h={["27px", null, "29px", "32px", "40px"]}
            alt={title + " logo"}
            src={src}
            // Index is to prevent naming conflicts for the hovered names (sometimes the name would show up at another component instead of the one hovered because they have the same id)
            id={`${title}#${index}${uniqueIdentifier ?? ""}`}
            transition=".2s"
            data-cy="tech-logo"
          />
      }
    </Box>
  );
}

