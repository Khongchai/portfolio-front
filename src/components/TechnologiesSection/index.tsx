import { Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { TechnLogos } from "./TechLogos";

export const TechSection: React.FC<{
  title: string;
  techTitles?: string[];
  fetching: boolean;
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  forceUpdateFallbackTexts: boolean;
}> = ({
  title,
  techTitles,
  fetching,
  setHoverComponentName,
  forceUpdateFallbackTexts,
}) => {
  return (
    <Grid id="tech-section">
      <Heading
        size="lg"
        fontWeight="100"
        letterSpacing="3px"
        as="h2"
        mb="1.75rem"
      >
        {title}
      </Heading>

      <Grid
        id="tech-container"
        padding="1rem"
        bgColor="backgroundOnBlack"
        borderRadius="1rem"
        placeItems="center"
      >
        {!fetching && techTitles && techTitles.length > 0 ? (
          <TechnLogos
            forceUpdate={forceUpdateFallbackTexts}
            setHoverComponentName={setHoverComponentName}
            techTitles={techTitles}
            noBorder={true}
            noSpace={true}
          />
        ) : (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};
