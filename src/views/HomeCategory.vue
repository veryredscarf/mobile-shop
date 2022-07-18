<template>
  <div>
<van-row>
  <van-col span="2">
    <van-icon name="arrow-left" @click="goBack" />
  </van-col>
  <van-col span="22">
    <van-tabs v-model="goodId" @click="tabClick">
      <van-tab v-for="item in categoryList" :title="item.name" :key="item.id" >
      </van-tab>
    </van-tabs>
  </van-col>

</van-row>

    <div class="home-category-title">
      <h3>{{currentCateInfo.name}}</h3>
      <p>{{currentCateInfo.front_desc}}</p>
    </div>

    <product :goodsList="categoryListData"></product>

  </div>
</template>
<script>
import {GetHomeCategoryListData,GetHomeCategoryGoodsList} from "@/request/api"
import product from "@/components/product.vue"
export default {
  data(){
    return {
      // 传递过来的商品ID
      goodsID:0,
      // tab选中下标
      active:0,
      // 总的分类列表信息
      categoryList:[],
      // 当前分类信息ID
      CurrentCateId:0,
      // 当前分类信息
      currentCateInfo:{},
      // 当前分类数据
      categoryListData:[]
    }
  },
  components:{
    product
  },
  created(){
    let id = this.$route.query.channelId
    console.log(id);
    this.initData({id})
    // console.log(this.goodId);
  
  },
  computed:{
    goodId:{
      get(){
        return this.categoryList.findIndex(item => item.id == this.CurrentCateId)
      },
      set(){
      }
    }
  },
  watch:{

    // 监听路由方法2
    $route:'init'
  //   // 监听路由对象方法1
  //   $route:{
  //     handler(value,oldValue){
  //       console.log(value.query.id);
  //       this.init(value.query)
  //     }
  //   }
  },

  methods:{
    tabClick(value){
      console.log(value);
      let info = this.categoryList[value]
      this.currentCateInfo = info
      console.log(info);
      GetHomeCategoryGoodsList({
        categoryId:info.id,
        page:1,
        size:1000
      }).then(res=>{
        let {goodsList} = res.data
        this.categoryListData = goodsList
        
      })
    },
    init(){
      let id = this.$route.query.channelId
      if(id){
        console.log(111);
        this.initData({id})
      }

    },
    initData(id){

      GetHomeCategoryListData(id)
      .then(res=>{
        console.log(res.data);
        let {brotherCategory,currentCategory} = res.data
        this.categoryList = brotherCategory
        this.currentCateInfo = currentCategory
        // 获取当前分类id
        this.CurrentCateId  = currentCategory.id
        // 设置tab下标值
        // this.active = brotherCategory.findIndex(item => item.id == currentCategory.id)
        console.log(this.CurrentCateId)
        GetHomeCategoryGoodsList({
          categoryId:this.CurrentCateId,
          page:1,
          size:1000
        }).then(res=>{
          console.log(res);
          let {goodsList} = res.data
          this.categoryListData = goodsList
        })
      })
    },
    // 返回箭头点击事件
    goBack(){
      this.$router.push('./home')
    }

  }
}
</script>

<style lang="less" scoped>
  .home-category-title{
    text-align: center;
    color: #a2a2a2;
    padding-bottom: .1rem;
    h3{
      line-height: .5rem;
      font-size: .18rem;
      color: black;
    }
  }
  .van-col--2{
        // width: 8.33333333%;
    /* height: 100%; */
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-size: 26px;
    background-color: white;
  }
</style>