<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell @click="cellClick(item)" v-for="(item,index) in searchValueList" :key="index" :title="item" />
    </van-list>
  </div>
</template>
<script>
export default {
  data(){
    return {
      finished:true,
    }
  },
  props:["searchValueList"],
  methods:{
    onLoad(){
    },
    // 搜索内容列表点击事件
    cellClick(val){
      this.$emit("cellClick",val)
    }
  }
}
</script>

<style>

</style>