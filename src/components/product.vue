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
  mounted(){
    // window.addEventListener("scroll", this.handleScroll, true);
    // this.toTop()
  },
  methods:{
    GoodClick(id){
      console.log(id);
      this.$router.push(`/goodDetail?id=${id}`)

      // 这种做法的目的是为了能够从商品详情页面中的样式进行跳出重新加载新的数据进入商品详情页，设定延时让页面进行刷新操作  并且让页面刷新
      setTimeout(()=>{
        this.$router.go(0)
        window.scrollTo(0,0)  // 增加用户体验，页面刷新后，自动回滚到页面顶部
      },10)
      
    },
    //  handleScroll(e) {
    //   let scrolltop = e.target.scrollTop;
    //   scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    // },
    // toTop() {
    //   console.log("wwww");
    //   let top = document.documentElement.scrollTop ||
    //   document.body.scrollTop;
    //   // 实现滚动效果
    //   const timeTop = setInterval(() => {
    //   document.body.scrollTop = document.documentElement.scrollTop =
    //   top -= 50;
    //   if (top <= 0) {
    //   clearInterval(timeTop);
    //   }
    //   }, 10);
    //   },
  },
  
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