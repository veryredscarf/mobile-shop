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
    <van-cell title="展示弹出层" is-link  @click="isSkuShow= true"/>
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

      <!-- 商品sku组件 -->
    <van-sku
      v-model="isSkuShow"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      ref='sku'
    />


    <!-- 购物车banner-加入购物车 -->
    <AppGoodCart @handleCartClick="listenHandleCartClick" :cartGoodsCount="cartGoodsCount"></AppGoodCart>






  </div>
</template>
<script>
import product from "@/components/product.vue"
import {GetGoodInfo,GetRelatedGoodInfo,GetCartInfo,addPutCart} from "@/request/api"
import CouponTip from "@/components/CouponTip.vue"
import AppGoodCart from '@/components/AppGoodCart.vue'
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
      goodsList:[],

      // 商品sku组件是否显示
      isSkuShow:false,
      // 商品sku信息
      sku:{
        tree:[],
        // 库存信息
        hide_stock:false,
        price:'',  // 默认价格，单位元
        stock_num:227  // 商品总库存
      },
      // 商品的图片缩略图
      goods:{
        picture:""
      },

      //购物车数量信息
      cartGoodsCount:0 ,
      // 定义加入购物车数据信息,在往后端发送处理加入购物车的请求中需要
      productList:[]




    }
  },
  components:{
    CouponTip,
    product,
    AppGoodCart
  },

  created(){
    // 获取路由携带的参数，并且根据参数像后端发送请求数据
    let id = this.$route.query
    GetGoodInfo(id)
    .then(res=>{
      this.images = res.data.gallery
      console.log(res);
      let {info,attribute,issue,productList} = res.data  // 采用es6的语法来解构对象
      this.info = info
      this.attribute = attribute
      this.goods_desc = info.goods_desc
      this.issue = issue

      this.productList = productList


      // 把获取到商品数据添加给sku数据中
      this.goods.picture = info.list_pic_url
      this.sku.price = info.retail_price
      this.sku.stock_num = info.goods_number


    })

// 获取相关产品的方法
    GetRelatedGoodInfo(id)
    .then(res=>{
      this.goodsList = res.data.goodsList
    })

    // 获取购物车商品总数量的方法
    GetCartInfo()
    .then(res=>{
      console.log(res);
      this.cartGoodsCount = res.data.cartTotal.goodsCount
    })

  },

  methods:{
   
    // 监听来自子组件传来的数据值
    listenHandleCartClick(){
      // 如果sku组件显示，则把商品加入到购物车
      // 如果sku组件没有显示，则显示sku组件
      if(this.isSkuShow){

      // 根据vantUI组建的效果，可以通过获取组件实例的方式，从而调用实例对象的getSkuData方法,来获取到弹出层组件实例中的商品数量数据
      console.log(this.$refs.sku.getSkuData().selectedNum);
      // 并向后端发送加入购物车数据，详情可以看接口文档http://xiaoyaoji.cn/project/1Ve70KqViGf/1VeUOSmFgYK
        addPutCart({
          goodsId:this.$route.query.id,
          productId:String(this.productList[0].id),
          number:this.$refs.sku.getSkuData().selectedNum
        }).then(res =>{

          console.log(res);
          // 根据返回数据并且重新把数据进行渲染
          this.cartGoodsCount = res.data.cartTotal.goodsCount
          this.$toast.success("加入购物车成功")

          // 并且跳转到哦购物车页面
          setTimeout(()=>{
            this.$router.push("/cart")
          },1000)

        })


      }else{
        this.isSkuShow = true
      }
    }
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
    margin-top: .1rem;
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