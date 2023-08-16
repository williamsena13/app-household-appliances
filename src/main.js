import Vue from "vue";
import App from "./App.vue";

import Toasted from "vue-toasted";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

Vue.use(Toasted);

Vue.config.productionTip = false;

import router from "./services/router";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
