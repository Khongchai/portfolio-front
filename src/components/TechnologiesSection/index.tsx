import { Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { TechnologyEntity } from "../../../generated/graphql";
import { TechLogo } from "./TechLogo";

export const TechSection: React.FC<{
  title: string;
  techTitles?: string[];
  fetching: boolean;
  setHoverComponentName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}> = ({ title, techTitles, fetching, setHoverComponentName }) => {
  return (
    <Grid className="tech-section">
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
        {!fetching && techTitles.length > 0 ? (
          <TechLogo
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
