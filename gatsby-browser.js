import { createClient, Provider } from "urql";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

const client = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : process.env.GATSBY_BACKEND_URL,
});

export const wrapRootElement = ({ element }) => {
  return (
    <Provider value={client}>
      <HelmetProvider>{element}</HelmetProvider>
    </Provider>
  );
};
