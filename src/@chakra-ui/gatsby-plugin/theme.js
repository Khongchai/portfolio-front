import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "../css/animation.css";
import "../fonts/stylesheet.css";
import "../css/styles.css";
import "../css/markdown.css";

const theme = {
  fonts: {
    body: "Proxima Nova th",
    heading: "Proxima Nova th",
  },
  colors: {
    mainBlack: "black",
    mainWhite: "white",
    secondaryBlack: "#101010",
    mainGradient: "linear-gradient(to right, #b891ff, #e45f6b, #f99f35)",
  },
  styles: {
    global: {
      "html, body": {
        background: "black",
        color: "white",
      },
    },
  },
};

export default extendTheme(theme);
