import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer/index";
import { SplashScreen } from "../components/splashScreen/index";
import { setCookie } from "../utils/cookie/setCookie";
import { getCookieValue } from "../utils/cookie/getCookie";

export default function Layout({ children }) {
  const [entryCookie, setEntryCookie] = useState(false);
  useEffect(() => {
    setEntryCookie(getCookieValue("firstEntry"));
    setCookie("firstEntry", "true", 1);
  }, []);

  return (
    <>
      {entryCookie ? null : <SplashScreen zIndex="999" />}
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
