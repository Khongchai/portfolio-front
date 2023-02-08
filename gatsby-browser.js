import { createClient, Provider } from "urql";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

const client = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : process.env.BACKEND_URL,
});

console.log("Key: ", process.env);

export const wrapRootElement = ({ element }) => {
  console.log(process.env.BACKEND_URL);
  return (
    <Provider value={client}>
      <HelmetProvider>{element}</HelmetProvider>
    </Provider>
  );
};
