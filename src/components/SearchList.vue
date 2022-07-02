<template>
  <div>
    <van-list
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in searchValueList" :key="index" :title="item" />
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
    }
  }
}
</script>

<style>

</style>