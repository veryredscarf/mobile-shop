<template>
  <div>
    <!-- 用路由源信息来判断tab栏是否显示-->
    <van-tabbar v-model="active" v-show="$route.meta.tabIsShow">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="label-o" to="/topic">专题</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>

export default {
  data(){
    return {
    }
  },
  computed:{   
    active:{  // 通过计算属性结合路由源信息来判断出当前是什么路由，从而推断出某一个tab被选中，因为active接受一个number来表示某一个item被选中
      get(){
       return this.$route.meta.activeNum
      },
      set(){}
    }
  }
}
</script>

<style>

</style>