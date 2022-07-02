<template>
  <div class="search">
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        :placeholder="placeholderValue"
        @search="onSearch"
        @cancel="onCancel"
        @input="onInput"
        @clear = "onClear"
      />
            <!--    @input="onInput"  表示输入时的事件 -->
    </form>




    <history-hot v-if="blockShow==1" :historyList = "historyList" :hotKeywordList = "hotKeywordList"></history-hot>
    <search-list v-else-if="blockShow==2" :searchValueList = "searchValueList"></search-list>

  </div>
</template>
<script>

import HistoryHot from "@/components/HistoryHot.vue"
import SearchList from "@/components/SearchList.vue"
import {GetSearchList,GetSearchInfoData} from "@/request/api"

export default {
  data(){
    return {
      searchValue:'',  // 搜索值
      placeholderValue:'',  // 搜索提示文本
      // 为1，表示展示历史搜索记录或热门搜索
      // 为2，表示搜索提示列表
      // 为3，表示展示搜索场景的内容
      blockShow:1,
      historyList:[],  // 表示历史数据
      hotKeywordList:[],  // 表示·热门搜索
      searchValueList:[], // 搜索提示，实时数据
    }
  },
  components:{
    HistoryHot,
    SearchList
},
  created(){
    GetSearchList().then(res=>{
      console.log(res);
      this.placeholderValue = res.data.defaultKeyword.keyword  // 获取热搜关键字
      this.historyList = res.data.historyKeywordList
      this.hotKeywordList = res.data.hotKeywordList

    })
  },
  methods:{
    // onsearch在用户回车搜索的时候触发，val就是用户输入的值
    onSearch(val){
      console.log(val);
    },
    onCancel(){
      this.searchValue = ''
      this.$router.go(-1)
    },
    onInput(val){
      if(!val) return
      this.blockShow =2
      GetSearchInfoData({keyword:val}).then(res=>{
        console.log(res);
        this.searchValueList = res.data

      })
    },
    // 定义清除搜索框数据事件
    onClear(){
     
    }

  }
}
</script>

<style lang="less" scoped>
.search{

  position: absolute;
 
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  
}
</style> 