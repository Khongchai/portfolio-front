import { createClient, Provider } from "urql";
import React from "react";

const client = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "https://khong-portfolio-backend.herokuapp.com/",
});

export const wrapRootElement = ({ element }) => {
  return <Provider value={client}>{element}</Provider>;
};
