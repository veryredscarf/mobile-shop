<template>
  <div>
    <CouponTip></CouponTip>

    <van-checkbox-group v-model="result"  :disabled='isStepperEdting'>

        <!-- 内容区 商品卡片 -->
      <van-checkbox :name="item.id" checked-color="#ee0a24" v-for="item in cartGoodList" :key="item.id" 
        @click="changeCheck(item)"
        >
        <!-- 滑动删除商品卡片盒子 -->
        <van-swipe-cell>
            <van-card
              :num="item.number"
              :price="item.market_price"
              :title="item.goods_name"
              :thumb="item.list_pic_url"
            />
            <van-stepper v-model="item.number" v-show="isStepperEdting" @change="stepperClick(item)" @overlimit="mixDisabledClick"  />

          <template #right>
            <van-button square type="danger" text="删除"  @click="deleteGood(item.product_id)"/>
          </template>
        </van-swipe-cell>
        <!-- 滑动删除商品卡片盒子 结束 -->

      </van-checkbox>
      <!-- 内容区 商品卡片 结束-->

    </van-checkbox-group>



    <!-- 底部提交按钮 -->
    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkAll"  checked-color="#ee0a24" :disabled='isStepperEdting'>全选</van-checkbox>
      <template #tip>
        累计共<strong>{{cartTotal.goodsCount}}</strong>件商品，可点击
        <van-button :type="isStepperEdting?'danger':'primary'" 
                    size="small" 
                    @click="onClickEditAddress">{{isStepperEdting?'完成编辑':'编辑'}}
        </van-button>按钮进行商品数量修改
      </template>
    </van-submit-bar>

  </div>
</template>
<script>
import {GetCartGoodsList, ChangeCartGoodsList,StepperChangeCartGood,DeleteGood} from "@/request/api"
import CouponTip from '@/components/CouponTip.vue'
import { Notify } from 'vant';
export default {
  data(){
    return {
      // 步进器，数据控制
      value:1,
      // 步进器组件是否编辑
      isStepperEdting:false,


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

      // 复选框事件，需要判断编辑按钮是否为激活状态，如果按钮是激活状态则把底部的全选复选框的事件屏蔽掉，不做任何处理
      if(this.isStepperEdting) return

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


      // 复选框事件，需要判断编辑按钮是否为激活状态，如果按钮是激活状态则把商品列表复选框的事件屏蔽掉，不做任何处理
      if(this.isStepperEdting) return



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
      this.$toast.fail("功能暂未开放")
    },
    onClickEditAddress(){
      this.isStepperEdting = !this.isStepperEdting
    },
    // 步进器商品数量发生变化时，需要发送请求给后端,把商品对象参数传过来
    stepperClick(item){
      console.log(item);
      // 发送请求
      StepperChangeCartGood({
        goodsId:item.goods_id,
        id:item.id,
        number:item.number,
        productId:item.product_id
      }).then(res=>{
        console.log(res);
        // 更新购物车数据
        this.totalFn(res.data)
      })
    },
    // 当步进器点击不能点击按钮是触发（也就是商品数量最少时触发）
    mixDisabledClick(){
      Notify({ type: 'danger', message: '数量不能为0' });
    },
    // 删除商品方法
    deleteGood(goodId){
      console.log(goodId);
      DeleteGood({
        productIds:goodId.toString()
      }).then((res)=>{
      Notify({ type: 'primary', message: '删除成功' });
      this.totalFn(res.data)
      })
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
  .van-stepper{
    text-align: right;
  }
.van-button--square{
  height: 100%;
}
</style>