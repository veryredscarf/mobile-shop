<template>
  <div>
    <van-search v-model="searchValue" shape="round" disabled placeholder="请输入搜索关键词" />
    <p>11111</p>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  data(){
    return{
      searchValue:''
    }
  }
}
</script>
