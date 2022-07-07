<template>
  <div>
    <van-search @click="searchClick" v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item.image_url" width="100%" height="200px" />
      </van-swipe-item>
    </van-swipe>

<!-- 设置搜索弹出框出现时，搜索弹出窗的半透明遮罩层效果 -->
    <transition name="van-fade">
      <div class="search_popup" v-show="$store.state.isShowPopupShadow"></div>
  </transition> 
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
      images:[],
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
  },
  methods:{
    searchClick(){
      this.$router.push('/home/searchPopup')
      // 修改vuex中的state
      this.$store.commit("changePopupShadow",true)
    }
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
.search_popup{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
}



</style>