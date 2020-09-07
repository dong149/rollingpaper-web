// next.config.js
const withSass = require('@zeit/next-sass');
const withFonts = require('nextjs-fonts');
const withCSS = require('@zeit/next-css');
const withTypescript = require('@zeit/next-typescript');
// const withTypescript = require('next');

module.exports = withTypescript(
  withFonts(
    withSass(
      withCSS({
        webpack: (config) => {
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: '[name].[ext]',
              },
            },
          });

          return config;
        },
      })
    )
  )
);
