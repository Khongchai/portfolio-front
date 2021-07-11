import { createClient, Provider } from "urql";
import React from "react";

const client = createClient({
  url: "http://localhost:4000/graphql",
});

export const wrapRootElement = ({ element }) => {
  return <Provider value={client}>{element}</Provider>;
};
