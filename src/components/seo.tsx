import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

const SEO: React.FC<{
  title: string;
  description: string;
  image: string;
  article: boolean;
}> = ({ title = null, description = null, image = null, article = false }) => {
  return <div>Hello</div>;
};

export default SEO;
