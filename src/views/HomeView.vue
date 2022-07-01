<template>
  <div>
    这是home页面
    <van-button type="primary">主要按钮</van-button>
    <van-stepper v-model="value" />
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  data(){
    return{
      value:1
    }
  }
}
</script>
