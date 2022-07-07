import { Toast } from 'vant';
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Category from '../views/Category.vue'

// 改造push方法  在使用vueRouter之前,在跳转同一路由时不会报错
const originPlush = VueRouter.prototype.push;
  VueRouter.prototype.push = function(location){
    return originPlush.call(this,location).catch(err=>{})
  }



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta:{  // 路由源信息
      activeNum:0,
      tabIsShow:true
    },
    children:[
      {
        path: 'searchPopup',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
        name: 'searchPopup',
        meta:{
          tabIsShow:false
        },
        component: ()=> import('../views/SearchPopup.vue'),
      }
    ]
    
  },
  {
    path: '/topic',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
    name: 'topic',
    meta:{  // 路由源信息
      activeNum:1,
      tabIsShow:true
    },
    component: ()=> import('../views/Topic.vue'),
  },
  {
    path: '/category',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
    name: 'category',
    meta:{  // 路由源信息
      activeNum:2,
      tabIsShow:true
    },
    component: Category,
    children:[
      {
        path: 'searchPopup',  // 也可以采用这种写法   path: '/category/searchPopup',  跳转时的路由一定要正确：$router.push('/category/searchPopup')"
        name: 'searchPopup',
        meta:{
          tabIsShow:false
        },
        component: ()=> import('../views/SearchPopup.vue'),
      }
    ]
  },
  {
    path: '/cart',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
    name: 'cart',
    meta:{  // 路由源信息
      activeNum:3,
      tabIsShow:true
    },
    component: ()=> import('../views/Cart.vue'),
  },
  {
    path: '/profile',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
    name: 'profile',
    meta:{  // 路由源信息
      activeNum:4,
      tabIsShow:true
    },
    component: ()=> import('../views/Profile.vue'),
  },
  {
    path: '/goodDetail',  // 也可以采用这种写法   path: '/home/searchPopup',  跳转时的路由一定要正确：$router.push('/home/searchPopup')"
    name: 'goodDetail',
    component: ()=> import('../views/ProductDetail.vue'),
    meta:{
      tabIsShow:false
    }
  },

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let token = localStorage.getItem("token")


// 前置路由守卫 ，
router.beforeEach((to,from,next) =>{
  if(to.path=="/cart"){
    if(token){
      next()
    }else{
      // 表示没有登录  ，由于在vue中全局引入了vant，会在vue的原型上定义toast方法
       Vue.prototype.$toast("请先登录")
       next("/profile")  // 跳转到个人页，进行登录 next还可以定义跳转到某一路由中
    }
  }

  next()  // 表示放行，如果守卫中没有调用next()，那么即使页面刚开始的重定向也不能完成  在定义守卫时，最后面一定要街上next(),无论在中间是否定义了next
})

export default router
