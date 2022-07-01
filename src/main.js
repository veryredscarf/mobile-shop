import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import 'reset-css'   // 安装全局自动清除样式


import { Button,Stepper,Search } from 'vant';

Vue.use(Search);
Vue.use(Button)
Vue.use(Stepper)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
