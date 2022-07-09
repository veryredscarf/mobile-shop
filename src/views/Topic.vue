<template>
  <div class="topic">
    <div class="box" v-for="item in topicData" :key="item.id">
      <van-image class="pic" :src="item.scene_pic_url">
        <template v-slot:loading>
          <van-loading type="spinner" size="30" />
        </template>
      </van-image>

      <p class="title">{{item.title}}</p>
      <p class="subtitle">{{item.subtitle}}</p>
      <p class="price">{{item.price_info|changeRMB}}</p>
    </div>
    
    <van-pagination v-model="currentPage" mode="simple" :total-items="20" @change="pageclick" />

  </div>
</template> 
<script>
import {GetTopicList} from "@/request/api"
export default {
  data(){
    return {
      // 获取页面数据默认请求
      // 请求分页
      // 请求数据多少条
      size:20,
      // topic数据
      topicData:[],
      // 当前分页
      currentPage:1,
      // 判断是否需要回滚到顶部,默认false
      goTop:false


      
    }
  },
  created(){
    GetTopicList({
      page:this.currentPage,
      size:10
    })
    .then(res=>{
      console.log(res);
      let {data} = res.data
      this.topicData = data
    })
  },
  methods:{
    // 页面回滚事件
    top(){
      let top = window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop =
        top -= 100;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    // 页面点击事件
    pageclick(value){
      console.log(value);
      GetTopicList({
        page:value,
        size:10
    })
    .then(res=>{
      console.log(res);
      let {data} = res.data
      this.topicData = data
      this.$nextTick(()=>{
        this.top()
      })
    })
    }
  }
}
</script>

<style lang="less" scoped>
.topic{
  padding-bottom: .5rem;
}
.box{
  background-color: white;
  margin-bottom: .2rem;
  padding-bottom:.1rem ;
  p{
    text-align: center;
    margin: .1rem;
  }
  .title{
    margin-top: .15rem;
    font-size: .18rem;
    font-weight:600;
  }
  .subtitle{
    font-size: .14rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .price{
    color: darkred;
  }
  .pic{
    width:100%;
  }
  
}
:deep(.van-pagination__page-desc){
  display: none;
}
:deep(.van-pagination__item--disabled){
  color: rgb(157, 154, 154) !important;
}

:deep(.van-pagination__item){
  color: darkred;
}


</style>