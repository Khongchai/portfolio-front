import * as React from "react";
import { Link } from "gatsby";
import { Button } from "@chakra-ui/react";

// styles
const pageStyles = {
  color: "white",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  display: "grid",
  placeItems: "center",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};
const codeStyles = {
  color: "#8A6534",
  padding: 4,
  backgroundColor: "#FFF4DB",
  fontSize: "1.25rem",
  borderRadius: 4,
};

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Not found</title>
      <h1 style={headingStyles}>Page not found</h1>
      <p style={paragraphStyles}>
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        {process.env.NODE_ENV === "development" ? (
          <>
            <br />
            Try creating a page in <code style={codeStyles}>src/pages/</code>.
            <br />
          </>
        ) : null}
        <br />
        <Button bg="green" _hover={{ background: "green.400" }}>
          <Link to="/">Go home</Link>.
        </Button>
      </p>
    </main>
  );
};

export default NotFoundPage;
