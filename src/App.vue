<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  background-color: #efefef;
  font-size: .14rem;
}
html,body{
  height: 100%;
}
html{
  font-size: 100px!important;  
  /* 移动端尽量用rem，因此设置根节点字号,由于清除样式包会设置字体大小，因此需要加权重避免定义的字体大小被修改 */
}

</style>
