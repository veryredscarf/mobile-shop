<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img width="100%" v-lazy="image.img_url" style="display:block" />
      </van-swipe-item>
    </van-swipe>

    <!-- 优惠券信息组件 -->
    <CouponTip></CouponTip>
    
    <div class="info">
      <div class="good-title">{{info.name}}</div>
      <div class="good-brief">{{info.goods_brief}}</div>
      <div class="retail-price">{{info.retail_price|changeRMB}}</div>
    </div>
    <van-cell title="展示弹出层" is-link />
    <!-- 商品参数层 -->
    <div class="attribute">
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item,index) in attribute" :key="index">
          <div class="left">{{item.name}}:</div>
          <div class="right van-ellipsis">{{item.value}}</div>
        </li>
      </ul>
    </div>

    <!-- 商品图片信息 -->
    <div class="goods_desc" v-html="goods_desc"></div>

    <!-- 常见问题板块 -->
    <div class="issue">
      <van-divider
        :style="{ color: 'black', borderColor: 'black', margin: '0 1rem' }"
      >
        常见问题
      </van-divider>

      <ul>
        <li v-for="item in issue" :key="item.id">
          {{item.question}}
          <div class="answer">{{item.answer}}</div>
        </li>
      </ul>
    </div>


    <!-- 大家都在看板块 -->
    <div class="everyoneSee">
      <van-divider
        :style="{ color: 'black', borderColor: 'black', margin: '0 1rem' }"
      >
        大家都在看
      </van-divider>
      <product  :goodsList="goodsList"></product>
    </div>








  </div>
</template>
<script>
import product from "@/components/product.vue"
import {GetGoodInfo} from "@/request/api"
import CouponTip from "@/components/CouponTip.vue"
export default {
  data(){
    return {
      // 轮播图数据
      images: [],
      // 商品信息
      info:{},
      // 商品参数
      attribute:[],
      // 商品信息 ---图片信息（html标签）
      goods_desc:'',
      // 配置常见问题信息
      issue:[],
      goodsList:[]

    }
  },
  components:{
    CouponTip,
    product
  },

  created(){
    // 获取路由携带的参数，并且根据参数像后端发送请求数据
    let id = this.$route.query
    GetGoodInfo(id)
    .then(res=>{
      this.images = res.data.gallery
      console.log(res);
      let {info,attribute,issue} = res.data  // 采用es6的语法来解构对象
      this.info = info
      this.attribute = attribute
      this.goods_desc = info.goods_desc
      this.issue = issue
      console.log(this.issue);
      // this.goodsList = 
    })

  }
}
</script>

<style lang="less" scope>
  .info{
    background-color: white;
    text-align: center;
    line-height: 40px;
    padding: .1rem 0;
    .good-title{
      font-size: .2rem;
    }
    .retail-price{
      color: darkred;
    }

  }
  .van-cell{
    border-top: 1px #ccc solid;
  }
  .attribute{
    background-color: #fff;
    margin-top: .2rem;
    padding: .1rem .16rem;
    h3{
      font-size: 0.16rem;
      line-height: .5rem;
    }
    li{
      height: .4rem;
      line-height: .4rem;
      background-color: #efefef;
      display: flex;
      margin-bottom: .1rem;
      border-radius: .05rem;
      .left{
        width: 30%;
        flex: 3;
        text-align: right;
        margin-right:.1rem ;
        font-size: .12rem;
      }
      .right{
        flex: 7;
        font-size: .16px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

      }
    }
  }
  // 深度样式写法，穿透ui组件，直接添加在标签上
  .goods_desc{
    img{
      display: block;
      width: 100%;
    }
  }
  .issue{

    margin-top: .1rem;
    background-color: white;
    .van-divider{
      height: 40px;
      line-height: 40px;
    }
    li{
      list-style-position: inside;
      list-style-type: disc;
      padding:0.1rem 0.1rem 0 0.1rem ;
      text-indent: .01rem;
      .answer{
        padding-top: 0.1rem;
        width: 105%;
        font-size: 0.10rem;
        word-spacing: 0.01rem;
        line-height: 0.14rem;
        transform: scale(0.9);
        color: #616161;
      }
    }
  }
  .everyoneSee{
    padding-top: .1rem;
    background-color: white;
  }
</style>