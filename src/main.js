import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import store from '@/store.js';
import VueLazyload from 'vue-lazyload'
import wx from 'weixin-js-sdk'
import {http,qs} from '@/utils'
import 'amfe-flexible'
import 'promise-polyfill/src/polyfill';
import router from './router'
Vue.config.productionTip = false
Vue.use(VueLazyload);
Vue.prototype.$wx = wx
Vue.prototype.$http = http
Vue.prototype.$qs = qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
