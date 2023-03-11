import Vue from 'vue';
import _ from "lodash";
import VueMeta from 'vue-meta'
import VueCookies from 'vue-cookies';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

Vue.use(_);
Vue.prototype._ = _;
Vue.use(VueMeta);
Vue.use(VueCookies);
Vue.use(ElementUI, { locale });

