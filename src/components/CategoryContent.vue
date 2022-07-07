<template>
  <div>
    <div class="imgContainer">

      <van-image
        :src="currentCategoryInfo.banner_url"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="40" color="#1989fa" />
        </template>
      </van-image>

      <h5>{{currentCategoryInfo.front_desc}}</h5>
    </div>
    <van-divider
      :style="{ color: 'black', borderColor: 'black', margin: '.1rem 0.5rem 0 .5rem' }"
    >
      {{currentCategoryInfo.name}}
    </van-divider>

    <van-grid :column-num="3" square >
      <van-grid-item   v-for="value in currentCategoryInfo.subCategoryList" :key="value.id" :icon="value.wap_banner_url" :text="value.name" >
      </van-grid-item>
      
    </van-grid>
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  props:["currentCategoryInfo"]
}
</script>

<style lang="less" scoped>
  .imgContainer{
    width: 100%;
    height: 1.5rem;
    text-align: center;
    position: relative;
    .van-image{
      display:inline-block;
      width: 95%;
      height: 140px;
      margin-top: 5px;
      box-shadow: 0px 0px 6px  rgba(0, 0, 0, 0.5);
      filter: brightness(0.5);
      border-radius: 12px;
    }
    h5{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: white;
      
    }
  }


</style>