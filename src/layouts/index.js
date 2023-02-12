import React, { useState, useEffect } from "react";
import { Footer } from "../components/footer/index";
import { Navbar } from "../components/Navbar";
import SEO from "../components/seo";
import { SplashScreen } from "../components/splashScreen/index";
import { getCookieValue } from "../utils/cookie/getCookie";
import { inject } from "@vercel/analytics";

export default function Layout({ children }) {
  const [visitAlready, setVisitAlready] = useState(false);
  useEffect(() => {
    const cookieValue = getCookieValue("visitAlready");
    setVisitAlready(cookieValue === "true" ? true : false);
  }, [visitAlready]);

  useEffect(() => {
    inject();
  }, []);
  return (
    <>
      {visitAlready ? null : <SplashScreen zIndex="9999999" />}
      <SEO />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
