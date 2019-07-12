import 'babel-polyfill';
import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./common/css/resets.css";
import "./common/css/Size.css";
import 'mint-ui/lib/style.min.css';
import "./common/js/filter.js";
import "./common/js/rem.js";
import Axios from "./api/index.js";

import Mint from "mint-ui";
// require("es6-promise").polyfill()
Vue.prototype.$https = Axios;
Vue.config.productionTip = false;
Vue.use(Mint);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
