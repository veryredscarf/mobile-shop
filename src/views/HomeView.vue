<template>

  <div style="padding-bottom:.6rem">
    <van-search @click="searchClick" v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />

    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img v-lazy="item.image_url"  />
      </van-swipe-item>
    </van-swipe>

    <!-- 分类小标题 -->
    <van-grid :column-num="5">
      <van-grid-item :icon="item.icon_url" :text="item.name" v-for="item in channel" :key="item.id" @click="homeCategoryClick(item.id)" />  
    </van-grid>


    <!-- 品牌制造供应商 -->
    <div class="brandRecommendation">
      <h1>品牌制造供应商</h1>
      <ul class="band_class">
        <li v-for="item in brandList" :key="item.id">
          <img :src="item.pic_url" alt="" width="100%">
          <div class="brand-desc">
            <h4>{{item.name}}</h4>
            <p>{{item.floor_price|changeRMB}}</p>
          </div>
        </li>
      </ul>
    </div>

      <!-- 周一到周，新品首发 -->
    <div class="brandRecommendation">
      <h1>周一到周四，新品首发</h1>
      <ul class="newProduct_class band_class">
        <li v-for="item in newProductLanuch" :key="item.id">
          <img :src="item.list_pic_url" alt="" width="100%">
            <h4>{{item.name}}</h4>
            <p>{{item.retail_price|changeRMB}}</p>
        </li>
      </ul>
    </div>

    <!-- 人气推荐 -->
    <div class="brandRecommendation">
      <h1>人气推荐</h1>
      <van-card v-for="item in hotGoodsList" :key="item.id"
        :price="item.retail_price"
        :desc="item.goods_brief"
        :title="item.name"
        :thumb="item.list_pic_url"
      />
    </div>



    <!-- 专题精选 -->
  <div class="featured">
    <h1>专题精选</h1>
    <van-swipe  :show-indicators='false' :width="300" :loop ="false">
      <van-swipe-item style="margin-right:.1rem;" v-for="(item, index) in topicList" :key="index">
        <img v-lazy="item.item_pic_url" style="height: 2rem" />
        <p>{{item.title}}<span>{{item.price_info|changeRMB}}</span></p>
        <p class="subtitle">{{item.subtitle}}</p>
      </van-swipe-item>
    </van-swipe>
  </div>

  <!-- 居家 -->
    <div class="brandRecommendation" v-for="item in categoryGoodsList" :key="item.id">
      <h1>{{item.name}}</h1>
      <product :goodsList="item.goodsList"></product>
    </div>


<!-- 设置搜索弹出框出现时，搜索弹出窗的半透明遮罩层效果 -->
    <transition name="van-fade">
      <div class="search_popup" v-show="$store.state.isShowPopupShadow"></div>
  </transition> 
<!-- 需要本路由下跳转子路由因此需要在本页面设置占位符 也就是router-view -->
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import product from "@/components/product.vue"
import {GetHomeList} from '../request/api'

export default {
  name: 'home',
  data(){
    return{
      // 搜索款信息
      searchValue:'',
      // bannner图片数组
      images:[],
      // banner下方的小分类
      channel:[],
      // 品牌制造供应商
      brandList:[],
      // 周一到周四，新品推荐
      newProductLanuch:[],
      // 人气推荐
      hotGoodsList:[] ,
      // 专题精选
      topicList:[],
      // 分类商品总数居
      categoryGoodsList:[],


    }
  },
  components:{
    product
  },
  created(){
    GetHomeList()
    .then(res=>{
      let {channel,brandList,newGoodsList,hotGoodsList,topicList,categoryList} = res.data
      this.images = res.data.banner
      this.channel = channel
      this.brandList = brandList
      this.newProductLanuch = newGoodsList
      this.hotGoodsList = hotGoodsList
      this.topicList = topicList
      this.categoryGoodsList = categoryList

    
    })

  },
  methods:{
    searchClick(){
      this.$router.push('/home/searchPopup')
      // 修改vuex中的state
      this.$store.commit("changePopupShadow",true)
    },
    homeCategoryClick(id){
      console.log(id);
      this.$router.push(`/categoryChannel?channelId=${id}`)
    }
  }
}
</script>
<style lang="less" scoped>
.van-swipe-item {
  p{
    margin: .05rem 0;
  }
  .subtitle{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 250px;
    font-size: 12px;
  }
  span{
    color: darkred;
    margin: 0 .05rem;
  }
  img{
  width: 100%;
  height: 220px;
  }
}  

  
.slide-enter,.slide-leave-to{
  // 过渡开始之前的样式
   right: -100%;
}
.slide-enter-active,.slide-leave-active{
  // 过渡过程的样式
  transition: right .3s;
}

.slide-enter-to,.slide-leave{
  // 过渡结束后的样式
   right: 0;
}
.search_popup{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0,0,0,0.5);
}

.brandRecommendation{
  margin-top: .2rem;
  background-color: #fff;
  h1{
    font-size: .2rem;
    text-align: center;
    line-height: .5rem;
  }
}
.band_class{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  li{
    width: 49%;
    position: relative;
  }
}
.brand-desc{
  position: absolute;
  top: .1rem;
  left: .1rem;
  font-size: .12rem;
 
  p{
    margin-top: .2rem;
    color: darkred;
  }
}
.newProduct_class{
  text-align: center;
  padding-bottom: .1rem;
  p{
    margin-top: .05rem;
    color: darkred;
  }
}
.popularRecommendation_class{
  li{
    display: flex;
    justify-content: center;
    img{
      flex: 3;
    }
    .popularRecommendation_title{
      flex: 7;
    }
  }
}
.van-card__title{
  height: .3rem;
  font-size: .2rem;
  line-height: .3rem;
}
.van-card__desc{
  font-size: .14rem;
  line-height: .3rem;
}
.van-card__price{
  color: darkred;
}
.featured{
  margin-top: .2rem;
  background-color: #fff;
  padding: 0 .1rem .1rem .1rem;
    h1{
    font-size: .2rem;
    text-align: center;
    line-height: .5rem;
  }
}
</style>