import { Box, Flex, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TechnologyEntity } from "../../../generated/graphql";

export const TechLogo: React.FC<{
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  tech: TechnologyEntity[] | null | undefined;
  desc?: string;
  //This forces the component to rerun setTextsAsLogos
  forceUpdate?: boolean;
  noBorder?: boolean;
  noSpace?: boolean;
}> = ({
  tech,
  desc,
  setHoverComponentName,
  forceUpdate,
  noBorder,
  noSpace,
}) => {
  //If no technologies provided, return nothing for this field
  if (!tech || tech.length === 0) {
    return <></>;
  }
  const [textsAsLogos, setTextsAsLogos] = useState<string[]>([]);
  const [update, setUpdate] = useState(true);
  useEffect(() => {
    if (forceUpdate !== undefined) {
      if (update !== forceUpdate) {
        setTextsAsLogos([]);
      }
      setUpdate(forceUpdate);
    }
  }, [forceUpdate]);

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
        w="100%"
        align="center"
      >
        {tech?.map((tech, i) => {
          const nameOriginal = tech.title;
          const name = nameOriginal.toLowerCase();
          const nameNoSpace = name.replace(/[\s\.]+/g, "");
          let src = `/logos/${nameNoSpace}.png`;
          let img = (
            <Box>
              <Img
                onMouseOver={(e: any) => {
                  setHoverComponentName(e.target.id);
                }}
                onMouseOut={() => {
                  setHoverComponentName(undefined);
                }}
                onClick={(e: any) => {
                  e.stopPropagation();
                }}
                onError={(e: any) => {
                  /* prevent infinite loop by checking if "svg" is already checked */
                  if (e.target.src.slice(-3) !== `svg`) {
                    e.target.src = `/logos/${nameNoSpace}.svg`;
                  } else {
                    setTextsAsLogos([...textsAsLogos, nameOriginal]);
                    (e.target as HTMLImageElement).style.display = "none";
                  }
                }}
                _hover={{
                  transform: "scale(1.3)",
                }}
                m="1rem"
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                padding={"1px"}
                key={nameOriginal}
                h={["27px", null, "29px", "32px", "40px"]}
                src={src}
                // Index is to prevent naming conflicts for the hovered names (sometimes the name would show up at another component instead of the one hovered because they have the same id)
                id={`${nameOriginal}#${i}`}
                transition=".2s"
              />
            </Box>
          );

          return img;
        })}
        {textsAsLogos.map((text) => (
          <Text key={text} padding="4px" margin="4px">
            {text}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};
