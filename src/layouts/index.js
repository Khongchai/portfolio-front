import React, { useState, useEffect } from "react";
import { Footer } from "../components/footer/index";
import { Navbar } from "../components/Navbar";
import { SplashScreen } from "../components/splashScreen/index";
import { getCookieValue } from "../utils/cookie/getCookie";

export default function Layout({ children }) {
  const [visitAlready, setVisitAlready] = useState(false);
  useEffect(() => {
    const cookieValue = getCookieValue("visitAlready");
    setVisitAlready(cookieValue === "true" ? true : false);
  }, [visitAlready]);
  return (
    <>
      {visitAlready ? null : <SplashScreen zIndex="999" />}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
