const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const whitelister = require("purgecss-whitelister");
const glob = require("glob-all");
const sane = require("sane");

const config = {
  https: false,
  host: "localhost",
  port: 8080,
  watchDir: "templates",
  // Whitelist selectors to stop purgecss from removing them from your CSS
  // You can pass in whole stylesheets to whitelist everything from thirdparty libs
  // Accepts string paths, array of strings, globby strings, or array of globby strings:
  // ['./node_modules/lib1/*.css', './node_modules/lib2/*.scss']
  purgecssWhitelist: [],
  // Whitelist based on a regular expression.
  // Ex: [/red$/] (selectors ending in 'red' will remain)
  // https://www.purgecss.com/whitelisting
  purgecssWhitelistPatterns: [
    /-(leave|enter|appear)(|-(to|from|active))$/,
    /^(?!(|.*?:)cursor-move).+-move$/,
    /^router-link(|-exact)-active$/,
  ],
};

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g) || [];
  }
}

module.exports = {
  runtimeCompiler: false,

  outputDir: "web/dist",
  filenameHashing: process.env.NODE_ENV === "production",

  css: {
    sourceMap: true,
  },

  devServer: {
    // Uncommenting these will lose the 'Network' app access
    // host: config.host,
    // port: config.port,
    https: config.https,
    clientLogLevel: "info",
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
    before(app, server) {
      const watcher = sane(path.join(__dirname, config.watchDir), { glob: ["**/*"] });
      watcher.on("change", (filepath) => {
        console.log("  File saved:", filepath);
        server.sockWrite(server.sockets, "content-changed");
      });
    },
  },

  configureWebpack: {
    plugins: [
      new ManifestPlugin({
        publicPath: "/dist/",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, "./templates/**/*.html"),
          path.join(__dirname, "./templates/**/*.twig"),
          path.join(__dirname, "./src/**/*.vue"),
          path.join(__dirname, "./src/**/*.js"),
        ]),
        whitelist: whitelister(config.purgecssWhitelist),
        whitelistPatterns: config.purgecssWhitelistPatterns,
        extractors: [
          {
            extractor: TailwindExtractor,
            // Specify the file extensions to include when scanning for class names.
            extensions: ["html", "js", "twig", "vue"],
          },
        ],
      }),
    ],
  },

  // Disable building a useless index.html file
  chainWebpack: (conf) => {
    conf.plugins.delete("html");
    conf.plugins.delete("preload");
    conf.plugins.delete("prefetch");
  },

  publicPath:
    process.env.NODE_ENV === "production"
      ? "/"
      : `${config.https ? "https" : "http"}://${config.host}:${config.port}/`,
  assetsDir: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
};
