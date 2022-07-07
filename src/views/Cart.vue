<template>
  <div>
    <CouponTip></CouponTip>

    <van-checkbox-group v-model="result">
      <van-checkbox :name="item.id" checked-color="#ee0a24" v-for="item in cartGoodList" :key="item.id" 
        @click="changeCheck(item)"
        >
        <van-card
          :num="item.number"
          :price="item.market_price"
          :title="item.goods_name"
          :thumb="item.list_pic_url"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll"  checked-color="#ee0a24">全选</van-checkbox>
      <template #tip>
        累计共<strong>{{cartTotal.goodsCount}}</strong>件商品，可点击<van-button type="primary" size="small" @click="onClickEditAddress">编辑</van-button>按钮进行商品数量修改
      </template>
    </van-submit-bar>

  </div>
</template>
<script>
import {GetCartGoodsList, ChangeCartGoodsList} from "@/request/api"
import CouponTip from '@/components/CouponTip.vue'
export default {
  data(){
    return {
      // 展示选中商品元素数组，数组值是UI组件中的name值
      result: [],

      // 购物车商品数据
      cartGoodList:[],
      // 购物车商品总信息
      cartTotal:[]
    }
  },
  computed:{
    // 全选按钮的控制判断方法1：,通过购物车默认数据长度cartGoodList，以及result数组收集被选中的按钮属性作比较，如果相等，表示全选，如果不等表示非全选，全选按钮值就为false
    // 全选按钮的控制判断方法2：,通过后端返回的商品总数，和返回的选中商品总数作比较

    checkAll:{
      get(){
        return this.result.length==this.cartGoodList.length
      },
      set(value){

        // 获取所有商品的id,由于后端在处理多个商品时，需要的返回的是一个字符串，其中用','隔开每个商品
        let arr = []
        this.cartGoodList.map(item=>{
          arr.push(item.product_id)
        })

        ChangeCartGoodsList({
        // 表示是否选中
        isChecked:value?1:0,
        // 表示对应商品的ID
        productIds:arr.join(),
        }).then(res=>{
          console.log(res);
          this.totalFn(res.data)
        })
      }
    }
  },
  components:{
    CouponTip
  },
  created(){
    GetCartGoodsList().then(res=>{
      console.log(res);
        this.totalFn(res.data)


    })
  },
  methods:{
    // 在购物车中的设置数据的方法中可复用的代码进行封装
    totalFn(data){
      this.cartGoodList = data.cartList
      this.cartTotal  = data.cartTotal
      // 由于每次调用接口时都会往result数组中填充数据，但是由于总数据是没有变得，因此每次往result中填充数据，都需要清空元数据
      this.result = []
      this.cartGoodList.map(item =>{
        item.checked==1? this.result.push(item.id):''
      })
    },
    // 商品选中切换事件
    changeCheck(checkGood){
      ChangeCartGoodsList({
        // 表示是否选中
        isChecked:checkGood.checked ==0?1:0,
        // 表示对应商品的ID
        productIds:checkGood.product_id
      }).then(res=>{
        console.log(res);
        this.totalFn(res.data)
      })
    },
    onSubmit(){
      console.log("111");
    },
    onClickEditAddress(){
      console.log("111111");
    }
  }
}
</script>

<style lang="less" scoped>


  /deep/ .van-checkbox__label{
    flex: 1 ;
  }

  .van-checkbox-group{
    background-color: rgb(255, 255, 255);
    height: calc(100vh - 180px);
    overflow-y: scroll;

  .van-checkbox{
    padding: .1rem .15rem;
    border-bottom: 1px solid #ccc;
  }
  }
  .van-submit-bar{
    bottom: .5rem;
    border-bottom: 1px solid #ccc;    
  }
  .van-submit-bar__tip{
      display: flex;
    align-items: center;
  }

</style>