// next.config.js
const withSass = require('@zeit/next-sass');
const withFonts = require('nextjs-fonts');
const withCSS = require('@zeit/next-css');
// const withTypescript = require('next');

module.exports = withFonts(
  withSass(
    withCSS({
      webpack: function(config) {
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
    }),
  ),
);

