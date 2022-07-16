<template>
  <div class="category">
   <van-search @click="searchClick"  shape="round" disabled placeholder="请输入搜索关键词" />

  <div class="container">
    <van-sidebar v-model="activeKey"  @change="siderItemChange">
      <van-sidebar-item :title="item.name" v-for="item in categoryList" :key="item.id"  />
    </van-sidebar>
    <div class="content">
      <CategoryContent :currentCategoryInfo = "currentCategoryInfo"></CategoryContent>
    </div>
  </div>


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
import {GetCategoryList,GetCurrentCategoryList} from "@/request/api"
import CategoryContent from "@/components/CategoryContent.vue"
export default {
  data(){
    return {
      activeKey: 0,
      // 分类列表总信息
      categoryList:[],
      // 当前分类信息
      currentCategoryInfo:{}

    }
  },
  components:{
    CategoryContent
  },
  methods:{
    searchClick(){
      console.log(111);
      this.$router.push('/category/searchPopup')
      this.$store.commit("changePopupShadow",true)
    },
    // 某一分类被点击时触发函数
    siderItemChange(item){
      let items = this.categoryList[item]
      GetCurrentCategoryList({id:items.id})
      .then(res=>{
        this.currentCategoryInfo = res.data.currentCategory
      })
    },

  },
  created(){
    GetCategoryList()
    .then(res=>{
      this.categoryList = res.data.categoryList
      this.currentCategoryInfo = res.data.currentCategory
      
    })
  }
}
</script>

<style lang="less" scoped>
.container{
  display: flex;
  width: 100%;
  height: calc(100vh - 104px);
  background-color: #fff;
  .content{
    flex: 1;
  }
  .van-sidebar{
    height: 100%;
    background-color: #f7f8fa;
  }
}
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