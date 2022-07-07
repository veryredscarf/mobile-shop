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




    <history-hot v-if="blockShow==1" :historyList = "historyList" :hotKeywordList = "hotKeywordList" @tagClick ="listenTagClick"></history-hot>
    <search-list v-else-if="blockShow==2" :searchValueList = "searchValueList" @cellClick = "listenCellClick"></search-list>
    <search-products v-else :goodsList ="goodsList" :filterCategory = "filterCategory" @priceChange ="listenPriceChange" @categoryChange = "listenCateGoryChange"></search-products>

  </div>
</template>
<script>

import HistoryHot from "@/components/HistoryHot.vue"
import SearchList from "@/components/SearchList.vue"
import SearchProducts from "@/components/SearchProducts.vue"
import {GetSearchList,GetSearchInfoData,GetSearchGoodData} from "@/request/api"

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
      filterCategory:[], // 搜索产品内容的分类信息
      goodsList:[], // 搜索产品内容的商品列表
      order:'desc',  // 用于接受子组件传来的数据，表示价格的排序方式  ,默认是从低到高
      categoryId:null,  // 用于接收分类的ID，从而获取对应分类的数据
      sort:'', // 用于接收子组件传来的时某一分类id还是价格排序的方式信息price， 默认的搜索方式是id
    }
  },
  components:{
    HistoryHot,
    SearchList,
    SearchProducts
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
    // 子传父事件监听,检测类型变化
    listenCateGoryChange(value){
      console.log(value);
      // 更改id 
      this.categoryId = value
      this.sort = "id"
      // 发送商品请求
      this.onSearch(this.searchValue)
    },
    // 子传父事件监听,检测价格排序变化
    listenPriceChange(value){
      this.order = value
      this.sort = 'price'
      this.onSearch(this.searchValue)
    },
    // 监听子组件热门搜索，以及历史搜索标签点击事件
    listenTagClick(val){
      // 并且将内容赋值给搜索框中的内容
      this.searchValue = val
      this.onSearch(val)
    },
    // 监听子组件搜索列表点击事件，val表示子组件传来的数据
    listenCellClick(val){
      this.listenTagClick(val)
    },



    // onsearch在用户回车搜索的时候触发，val就是用户输入的值
    onSearch(val){
      this.blockShow = 3

      let requestInfo = {
        keyword:val,
        page:1,
        size:10,
        order:this.order,
        categoryId : this.categoryId,
        sort:this.sort
      } 

      GetSearchGoodData(requestInfo).then(res=>{
        let {filterCategory,goodsList} = res.data
        this.goodsList = goodsList

        // 由于后端传来的数据与UI组件需要的字段数据不一致，因此需要对数据在获取时进行处理
        // 采用深拷贝的方法
        let newArr  = JSON.parse(JSON.stringify(filterCategory).replace(/name/g,'text').replace(/id/g,'value'))
        this.filterCategory = newArr
      })
    },
    onCancel(){
      this.searchValue = ''
      this.$router.go(-1)
      this.$store.commit("changePopupShadow",false)
    },
    onInput(val){
      this.blockShow =2
      GetSearchInfoData({keyword:val}).then(res=>{
        this.searchValueList = res.data
        console.log("wahahhah",this.searchValueList);

      })
    },
    // 定义清除搜索框数据事件
    onClear(){
      this.searchValue = ''
    //  this.searchValueList = this.hotKeywordList
    }

  }
}
</script>

<style lang="less" scoped>
.search{

  position: absolute;
 
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: #efefef;
  
}
</style> 