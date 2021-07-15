import React from "react";
import { Footer } from "../components/footer/index";
import { Navbar } from "../components/Navbar";
import { SplashScreen } from "../components/splashScreen/index";
import { getCookieValue } from "../utils/cookie/getCookie";

export default function Layout({ children }) {
  return (
    <>
      <SplashScreen zIndex="999" />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
