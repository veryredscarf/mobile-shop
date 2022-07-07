<template>
  <div>
    <van-goods-action>
      <van-goods-action-icon 
        :icon="isCollectd ?'star':'star-o'" 
        :text="isCollectd ?'已收藏':'收藏'" 
        :color="isCollectd?'darkred':'#333'" 
        @click="isCollectd= !isCollectd"/>

      <van-goods-action-icon icon="cart-o" text="购物车" :badge="cartGoodsCount" color="#333"/>

      <van-goods-action-button type="warning" text="加入购物车"  @click="handleCartClick" />
      <van-goods-action-button type="danger" text="立即购买" @click="handleBuyClick" />
    </van-goods-action>
  </div>
</template>
<script>
export default {
  data(){
    return {
      isCollectd:false
    }
  },
  props:["cartGoodsCount"],
  methods:{
    handleCartClick(){
      // 子传父事件，通过父元素的某属性值来判断，是否跳转到购物车组件
      this.$emit("handleCartClick")
    },
    handleBuyClick(){
      this.$toast("功能未开放")
    }
  }
}
</script>

<style lang="less" scoped>
// 设置底部购物车组件不被sku组件默认的组件遮挡
.van-goods-action{
  z-index: 999999;
}
</style>