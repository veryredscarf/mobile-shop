<template>
  <div>
    <van-search @click="$router.push('/home/searchPopup')" v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item.image_url" width="100%"  />
      </van-swipe-item>
    </van-swipe>

<!-- 需要本路由下跳转子路由因此需要在本页面设置占位符 也就是router-view -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import {GetHomeList} from '../request/api'

export default {
  name: 'home',
  data(){
    return{
      searchValue:'',
      images:[]
    }
  },
  created(){
    GetHomeList()
    .then(res=>{
      this.images = res.data.banner
    })
    // axios.get("http://520it.com:8001/index/index")
    // .then(res=>{
    //   console.log(res.data);
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
  }
}
</script>
<style lang="less" scoped>
.slide-enter,.slide-leave-to{
  // 过渡开始之前的样式
   right: -100%;
}
.slide-enter-active,.slide-leave-active{
  // 过渡过程的样式
  transition: right .3s;
}

.slide-enter-to,.slide-leave{
  // 过渡结束后的样式
   right: 0;
}


</style>