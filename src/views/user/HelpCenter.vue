<template>
  <div class="helpCenter">
    <!-- 导航栏 -->
    <van-nav-bar left-text="帮助中心" color="#7e7e7e" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>
    <!-- 搜索栏 -->
    <van-search @click="searchClick" v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />

  </div>
</template>
<script>
export default {
  data(){
    return {
      searchValue:""
    }
  },
  methods:{
        searchClick(){
      this.$router.push('/home/searchPopup')
      // 修改vuex中的state
      // this.$store.commit("changePopupShadow",true)
    },
  }
}
</script>

<style scoped>
.helpCenter{
  position: absolute;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
}
.van-nav-bar{
  background-color: #efefef;
}
::v-deep .van-nav-bar__text{
  color: #7e7e7e;
  font-size: 20px;
}
::v-deep .van-nav-bar .van-icon {
  color: #7e7e7e;
  font-size: 30px;
}
::v-deep .van-nav-bar__left{
  padding:0 16px 0 0px ;
}
</style>