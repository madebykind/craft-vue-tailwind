require("dotenv").config();
require("colors");

const path = require("path"); // eslint-disable-line import/no-extraneous-dependencies
const fs = require("fs");
const ip = require("ip");
const Case = require("case");

/* Create a new Fractal instance and export it for use elsewhere if required */
const fractal = require("@frctl/fractal").create();
const mandelbrot = require("@frctl/mandelbrot");
const twigAdapter = require("@frctl/twig");
const jsonfile = require("jsonfile");

const srcPath = path.resolve(__dirname, "src");
const staticPath = path.resolve(__dirname, "web/dist");

const pkg = require("./package.json");

if (!pkg.kindConfig) {
  console.error("Error: looks like this project hasn't been configured yet".red);
  process.exit();
}

const assetManifestPath = path.resolve(__dirname, "styleguide/dist/manifest.json");

const assetManifest = fs.existsSync(assetManifestPath)
  ? jsonfile.readFileSync(assetManifestPath)
  : {};

/**
 * Shared
 */

// Set the title and version of the project
fractal.set("project.title", `${pkg.kindConfig.title} Design System`);
fractal.set("project.version", pkg.version);

/**
 * Paths
 */

// Set path to components
fractal.components.set("path", path.join(srcPath, "components"));
// Set path to documentation pages
fractal.docs.set("path", path.join(srcPath, "docs"));
// Where the generated static assets will be
fractal.web.set("static.path", staticPath);
fractal.web.set("static.mount", "dist");
// Where to output the built styleguide
fractal.web.set("builder.dest", path.resolve(__dirname, "styleguide"));

/**
 * Dev
 */
fractal.web.set("server.sync", true);
fractal.web.set("server.port", pkg.kindConfig.ports.fractal);
fractal.web.set("server.syncOptions", {
  open: true,
  notify: true,
});

/**
 * Templating
 */

// Set default preview layout
fractal.components.set("default.preview", "@preview");

const toAttrName = (str) => Case.kebab(str);
const toAttrValue = (val) => Array.isArray(val) ? val.join(" "): val;


// Use twig
fractal.components.engine(
  twigAdapter({
    filters: {
      rev: (filePath) => assetManifest[filePath] || filePath,
    },
    functions: {
      assetPort: () => process.env.ASSET_SERVER_PORT,
      assetHostname: () => ip.address(),
      isBuild: () => process.argv.includes("build"),
      attr: (attrs) =>
        Object.entries(attrs)
          .filter(([key]) => key[0] !== "_")
          .map(([key, value]) => {
            const valOutput = toAttrValue(value);
            if (valOutput) {
              return `${toAttrName(key)}="${valOutput}"`;
            }
            return null;
          })
          .join(" "),
    },
  })
);
fractal.components.set("ext", ".twig");

// use MD for docs
fractal.docs.set("ext", ".md");

// theme
fractal.web.theme(
  mandelbrot({
    skin: "default",
    format: "yaml",
  })
);

/**
 * Statuses
 */
fractal.components.set("default.status", "wip");
fractal.components.set("statuses", {
  deprecated: {
    label: "deprecated",
    description: "Do not implement.",
    color: "#FF3333",
  },
  prototype: {
    label: "Prototype",
    description: "Do not implement.",
    color: "#FF3333",
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution.",
    color: "#FF9233",
  },
  ready: {
    label: "Ready",
    description: "Ready to implement.",
    color: "#29CC29",
  },
});

/**
 * Collate components
 */

// Collate by default
fractal.components.set("default.collated", true);

// Wrapping each in a padded div
fractal.components.set(
  "default.collator",
  (markup, item) =>
    `<!-- Start: ${item.handle} -->\n
    <div style="padding-bottom:20px">\n
        <div style="padding-bottom: 10px; color: #b7b7b7;">\n
          <code>@${item.label}</code>
        </div>\n
        ${markup}\n
    </div>\n
    <!-- End: @${item.handle} -->\n`
);

/**
 * Craft integration
 */

function exportPaths() {
  const map = {};

  fractal.components.flatten().forEach((item) => {
    map[`@${item.handle}`] = path.relative(process.cwd(), item.viewPath);
  });

  fs.writeFileSync("components-map.json", JSON.stringify(map, null, 2), "utf8");
}

fractal.components.on("updated", () => exportPaths());

fractal.cli.command("pathmap", (opts, done) => {
  exportPaths();
  done();
});

module.exports = fractal;
