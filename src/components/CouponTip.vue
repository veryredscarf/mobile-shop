<template>
  <div class="tips">
    <van-row>
      <van-col span="8"><van-icon name="checked" color="red" />30天无忧退货</van-col>
      <van-col span="8"><van-icon name="checked" color="red" />48小时快速退费</van-col>
      <van-col span="8"><van-icon name="checked" color="red"/>满88免邮费</van-col>
    </van-row>
 
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  }
}
</script>

<style scoped>
  .tips{
    line-height: 30px;
    text-align: center;
  }
  .van-icon{
    vertical-align: baseline;
    margin-right: 2px;
  }
</style>