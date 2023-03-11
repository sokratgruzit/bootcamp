import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './register_plugins';

import mainMixin from '@/mixins/main';
Vue.mixin(mainMixin);

//prototypes
Vue.prototype.$PUBLIC = process.env.VUE_APP_PUBLIC;
Vue.prototype.$SERVER_API = process.env.VUE_APP_SERVER_API;
Vue.prototype.$SERVER_API_AUTH = process.env.VUE_APP_SERVER_API_AUTH;

Vue.config.productionTip = false  

new Vue({ 
  store,
  router,
  render: h => h(App)
}).$mount('#app')
