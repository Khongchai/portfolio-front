import React from "react";
import { Footer } from "../components/footer/index";
import { Navbar } from "../components/Navbar";
import { SplashScreen } from "../components/splashScreen/index";
import { getCookieValue } from "../utils/cookie/getCookie";

export default function Layout({ children }) {
  return (
    <>
      {typeof window !== "undefined" ? (
        getCookieValue("visitAlready") ? null : (
          <SplashScreen zIndex="999" />
        )
      ) : null}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
