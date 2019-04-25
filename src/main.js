import svg4everybody from "svg4everybody";
import Vue from "vue";

import "./assets/styles/app.postcss";
import "@/lib/svg-sprite";
import init from "@/lib/init";

Vue.config.productionTip = false;

// window.APP = new Vue({
//   el: '#app',
//   render(h) {
//     return h(App);
//   },
// });


window.addEventListener("DOMContentLoaded",
  () => init(window.GROW, {})
    .then(() => svg4everybody())

);
