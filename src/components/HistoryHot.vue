<template>
  <div>
    <div class="his-hot" v-show="isShowHistory">
      <div class="header">
        <h4>历史记录</h4>
        <van-icon name="delete-o" @click="clearHistory" />
      </div>
      <div class="bottom">
        <van-tag @click="tagClick(item)"  v-for="(item,index) in historyList" :key="index" plain type="default">{{item}}</van-tag>

      </div>
    </div>

    <div class="his-hot">
      <div class="header">
        <h4>热门搜索</h4>
      </div>
      <div class="bottom">
        <van-tag @click="tagClick(item.keyword)" v-for="(item,index) in hotKeywordList" :key="index" plain type="default" :class="item.is_hot==1?'active':''">{{item.keyword}}</van-tag>
  
      </div>
    </div>


  </div>
</template>
<script>
import {clearHistoryData} from "@/request/api"

export default {
  data(){
    return {
      isShowHistory:true
    }
  },
  props:{
    historyList:Array,
    hotKeywordList:Array // 热门搜索
  },
  mounted(){
    console.log(this.hotKeywordList);
  },
  methods:{
    tagClick(val){
      console.log(val);
      // 并且通过子传夫，让父组件完成搜索功能
      this.$emit("tagClick",val)
    },
    // 请求清除历史消息
    clearHistory(){
      clearHistoryData().then(res=>{
        if(res.errmsg ==0){
          // 提示语，并且隐藏历史记录盒子
          
          this.$toast.success('删除成功');
          setTimeout(()=>{
            this.isShowHistory = false
          },800)

        }else{
          this.$toast.fail('删除失败');
        }

      })
    }
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