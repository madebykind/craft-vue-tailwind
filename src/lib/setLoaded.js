/* eslint-disable no-param-reassign */
export default (global) => {
  global = global || window.APP || {};

  global.JS_LOADED = true;

  document.documentElement.classList.remove("js-loading");
  document.documentElement.classList.add("js-loaded");
};
