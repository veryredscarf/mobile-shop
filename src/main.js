import Vue from 'vue'
import App from './App.vue'

import router from './router/index'
import store from './store/index'

import 'reset-css'   // 安装全局自动清除样式


import { Button,Stepper,Search,SwipeItem,Swipe,Lazyload } from 'vant';



Vue.use(Lazyload);


Vue.use(Search);
Vue.use(Button)
Vue.use(Stepper)
Vue.use(SwipeItem)
Vue.use(Swipe)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
