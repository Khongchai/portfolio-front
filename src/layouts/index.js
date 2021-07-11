import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/footer/index";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
