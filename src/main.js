import Vue from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./common/css/resets.css";
import "./common/css/Size.css";
import "./common/js/filter.js";
import "./common/js/rem.js";
import Axios from "./api/index.js";
import "@/common/js/filter.js";
import 'mint-ui/lib/style.css';
import Mint from "mint-ui";
Vue.prototype.$https = Axios;
Vue.config.productionTip = false;
Vue.use(Mint);
var env = process.env.NODE_ENV
console.log(env)
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
