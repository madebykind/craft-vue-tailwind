/**
 * generate-tailwind-color-config.js
 *
 * Easily generate a tailwind 1.x color config by procedurally creating
 * optional light / dark tints
 *
 * Expected input:
 *
 *  {
 *  // Base config for standard lighten / darken amounts
 *   config: {
 *     // positive 0-100 decimal
 *     lighten: 15,
 *     // negative -100-0 decimal
 *     darken: -15,
 *   },
 *   // These colors will be passed through *without*
 *   // light/dark tints being created
 *   passThrough: {
 *     transparent: "transparent",
 *     black: "#000000",
 *     white: "#ffffff",
 *     // Quote keys with hyphens
 *     "grey-darkest": "#cccccc",
 *     grey: "#b8c2cc",
 *     "grey-lightest":  "#f5f5f5",
 *     "blue-dark": "#122257",
 *   },
 *   // These colors will have tints generated for them
 *   tints: {
 *     // pass a color string
 *     "brand-blue": "#1e3582",
 *     "brand-yellow": "#ffce00",
 *     // Optionally pass an object to customise the
 *     // darken or lighten amounts
 *     "accent-blue": {
 *       base: "#2a75eb",
 *       darken: "#ff3ff3",
 *       lighten: 10
 *     },
 *   },
 * };

 */
const { color, lightness } = require("kewler");

function getModified({ hex, key, config, rootConfig }) {
  let result;

  switch (typeof config[key]) {
    case "string":
      result = config[key];
      break;
    case "number":
      result = color(hex)(lightness(config[key]))();
      break;
    default:
      result = color(hex)(lightness(rootConfig[key]))();
      break;
  }

  return result;
}

const getTints = (tints, config) =>
  Object.entries(tints).reduce((acc, [name, tintConfig]) => {
    const hex = tintConfig instanceof Object ? tintConfig.base : tintConfig;

    return Object.assign(acc, {
      [name]: color(hex)(),
      [`${name}-light`]: getModified({
        hex,
        key: "lighten",
        config: tintConfig,
        rootConfig: config,
      }),
      [`${name}-dark`]: getModified({
        hex,
        key: "darken",
        config: tintConfig,
        rootConfig: config,
      }),
    });
  }, {});

const getColors = ({ config, passThrough, tints }) =>
  Object.assign({}, passThrough, getTints(tints, config));

module.exports = {
  getColors,
};
