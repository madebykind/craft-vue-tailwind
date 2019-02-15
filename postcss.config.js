const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");
const tailwindcss = require("tailwindcss");
const postcssPurgecss = require("@fullhuman/postcss-purgecss");

const isHotReloaded = process.argv.includes("serve");

class TailwindVueExtractor {
  static extract(content) {
    const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, "");
    return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_:/]+/g) || [];
  }
}

const extensionsUsingCSS = ["vue", "html"];
const extensionsOfCSS = ["css", "less", "pcss", "postcss", "sass", "scss", "styl"];

module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 2 }),
    tailwindcss("./tailwind.config.js"),
    !isHotReloaded &&
      postcssPurgecss({
        content: [`./@(web|src)/**/*.@(${extensionsUsingCSS.join("|")})`],
        css: [`./src/**/*.@(${extensionsOfCSS.join("|")})`],
        extractors: [
          {
            extractor: TailwindVueExtractor,
            extensions: extensionsUsingCSS,
          },
        ],
        whitelist: [],
        whitelistPatterns: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
        ],
      }),
    autoprefixer(),
  ],
};
