<template>
  <div>
    <div class="his-hot">
      <div class="header">
        <h4>历史记录</h4>
        <van-icon name="delete-o" />
      </div>
      <div class="bottom">
        <van-tag v-for="(item,index) in historyList" :key="index" plain type="default">{{item}}</van-tag>

      </div>
    </div>

    <div class="his-hot">
      <div class="header">
        <h4>热门搜索</h4>
      </div>
      <div class="bottom">
        <van-tag v-for="(item,index) in hotKeywordList" :key="index" plain type="default" :class="item.is_hot==1?'active':''">{{item.keyword}}</van-tag>
  
      </div>
    </div>


  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  props:{
    historyList:Array,
    hotKeywordList:Array // 热门搜索
  },
  mounted(){
    console.log(this.hotKeywordList);
  }
  
  

}
</script>

<style lang="less" scoped>
.his-hot{
  background-color: #fff;
  padding: .1rem;
  margin-bottom: .2rem;
  .header{
  display: flex;
  justify-content: space-between;
  font-size: .20rem;
  margin: 0 0 10px 0;
    h4{font-size: .16rem;};
  }
  .bottom{
    display: flex;
    justify-content: left;
    flex-flow: wrap;
    height: auto;
    .van-tag{
      padding: 0.05rem;
      margin: .03rem .1rem 0 0;
    }
  }




}
.active{
  color: red;
}


</style>