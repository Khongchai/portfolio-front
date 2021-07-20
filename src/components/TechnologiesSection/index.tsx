import { Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { TechLogos } from "./TechLogos";

type TechSectionProps = {
  title: string;
  techTitles?: string[];
  fetching: boolean;
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  forceUpdateFallbackTexts?: boolean;
};

export const _TechSection: React.FC<TechSectionProps> = ({
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
        data-cy="tech-container"
      >
        {!fetching && techTitles && techTitles.length > 0 ? (
          <TechLogos
            forceUpdate={
              forceUpdateFallbackTexts ? forceUpdateFallbackTexts : true
            }
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

export const TechSection = React.memo(
  _TechSection
) as React.FC<TechSectionProps>;
