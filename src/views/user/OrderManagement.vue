<template>
  <div class="orderMangement">
    <van-nav-bar title="订单中心" color="#7e7e7e" left-arrow @click-left="$router.go(-1)" >
      <template #right>
        <van-icon color="#333232" name="search" />
      </template>
    </van-nav-bar>

<!--  -->
    <van-tabs v-model="active" swipeable >
      <van-tab v-for="item in orderStatusList" :title="item.title" :key="item.id">
        内容 {{ item.title }}
        <div style="width:100%;height:80px;background-color: aqua;"></div>
      </van-tab>
    </van-tabs>

  </div>
</template>
<script>
export default {
  data(){
    return {
      active:1,
      orderStatusList:[
        {
          id:0,
          title:"全部"
        },
        {
          id:1,
          title:"待付款"
        },
        {
          id:2,
          title:'待发货'
        },
        {
          id:3,
          title:'待收货'
        },
        {
          id:4,
          title:'待评价'
        },
      ]
    }
  }
}
</script>

<style scoped>
.orderMangement{
  position: absolute;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
}
::v-deep .van-nav-bar__text{
  color: #7e7e7e;
  font-size: 20px;
}
::v-deep .van-nav-bar .van-icon {
  color: #7e7e7e;
  font-size: 30px;
}
</style>