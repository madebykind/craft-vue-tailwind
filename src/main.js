// Vendor
// import Vue from "vue";
import svg4everybody from "svg4everybody";

// Assets
import "./assets/styles/app.postcss";
import "@/lib/svg-sprite";

// Boostrap
import setLoaded from "@/lib/setLoaded";
import initModules from "@/lib/initModules";
import modulesEnabled from "@/modulesEnabled";

// Vue apps

const { APP } = window;
APP.DEBUG = typeof APP.DEBUG !== "undefined" ? APP.DEBUG : !process.env.NODE_ENV === "production";

// Vue.config.productionTip = false;

window.addEventListener("DOMContentLoaded", () => {
  svg4everybody();

  setLoaded(APP);
  APP.modules = initModules(APP.modules, modulesEnabled, APP.DEBUG);
});
