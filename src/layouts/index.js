import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer/index";
import { SplashScreen } from "../components/splashScreen/index";
import { setCookie } from "../utils/cookie/setCookie";
import { getCookieValue } from "../utils/cookie/getCookie";

export default function Layout({ children }) {
  useEffect(() => {
    setCookie("visitAlready", "true", 1);
  }, []);

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
