// next.config.js
const withSass = require("@zeit/next-sass");
const withFonts = require("nextjs-fonts");

module.exports = withSass({
  webpack(config, options) {
    return config;
  },
  /* config options here */
});
