<template>
  <div class="products">
    <ul>
      <li v-for="item in goodsList" :key="item.id" @click="GoodClick(item.id)">
        <img :src="item.list_pic_url" alt="图片" style="display:block;width: 1.7rem" >
        <div class="van-ellipsis">{{item.name}}</div>
          <div class="price">{{item.retail_price | changeRMB}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data(){
    return {
      imgSrc:require("../assets/logo.png")   // 采用这种方式引入图片，需要加入require
    }
  },

  props:["goodsList"],
  methods:{
    GoodClick(id){
      console.log(id);
      this.$router.push(`/goodDetail?id=${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.products{
  height: calc(100vh - 102px);
  overflow-y: scroll;
}
ul{
  padding: .1rem 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    width: 49%;
    margin-bottom: .1rem;
    text-align: center;
    line-height: .3rem;
    background-color: #fff;
    .price{
      color: darkred;
    }
  }
}

</style>