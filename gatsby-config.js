module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "Khong Portfolio",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        //Docs: https://chakra-ui.com/guides/integrations/with-gatsby
        resetCSS: true,
        isUsingColorMode: true,
      },
    },
  ],
};
