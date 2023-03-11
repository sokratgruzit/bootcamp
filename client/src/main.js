import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { i18n } from "./i18n";
import { Trans } from "./plugins/Translation";
import mainMixin from "@/mixins/main";
import "@/register_plugins";

Vue.config.productionTip = false;
Vue.mixin(mainMixin);

//prototypes
Vue.prototype.$PUBLIC =  process.env.VUE_APP_PUBLIC;
Vue.prototype.$SERVER_API =  process.env.VUE_APP_SERVER_API;
Vue.prototype.$i18nRoute = Trans.i18nRoute.bind(Trans);

new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
 