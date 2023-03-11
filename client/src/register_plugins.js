import Vue from "vue";
import vClickOutside from "v-click-outside";
import _ from "lodash";
import loader from "vue-ui-preloader";
import PortalVue from "portal-vue";
import VueMeta from 'vue-meta'



Vue.use(PortalVue);
Vue.use(vClickOutside);
Vue.use(_);
Vue.prototype._ = _;
Vue.use(loader);
Vue.use(VueMeta)
