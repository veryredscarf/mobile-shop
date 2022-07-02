import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

// 改造push方法  在使用vueRouter之前
const originPlush = VueRouter.prototype.push;
  VueRouter.prototype.push = function(location){
    return originPlush.call(this,location).catch(err=>{})
  }



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home '
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[
      {
        path: 'searchPopup',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
        name: 'searchPopup',
        component: ()=> import('../views/SearchPopup.vue'),
      }
    ]
    
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
