<template>
  <div>
    <van-search v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item.image_url" width="100%"  />
      </van-swipe-item>
    </van-swipe>
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
      console.log(this.images);
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
