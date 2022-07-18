<template>
  <div class="accountSecurity">
    <van-nav-bar left-text="账号与安全" color="#7e7e7e" left-arrow @click-left="$router.go(-1)" @click-right = dialogShow>
      <template #right>
        <van-icon color="#333232" name="ellipsis" />
      </template>
    </van-nav-bar>

    <van-cell title="XX账号" is-link value="XXXXXXXXXXX" />
    <van-cell title="手机号" is-link value="XXXXXXXXXXX" />
    <van-cell title="实名认证" is-link value="未认证" />

  <div class="password">
    <van-cell title="修改登录密码" is-link  />
    <van-cell title="支付宝账号" is-link value="XXXXXXXXXXX" />
  </div>

  <div class="verify">
    <van-cell title="扫码验证" is-link value="未开启" />
  </div>

  <div class="login">
    <van-cell title="登陆设备管理" is-link value="查看当前在线设备" />
    <van-cell title="账号日志" is-link value="查看最近敏感操作" />
    <van-cell title="锁定账号" is-link value="账号被盗或手机丢失" />
    <van-cell title="安全中心" is-link  />
  </div>

  <div class="signOut">
    <van-cell title="注销账号" is-link  />
  </div>

<!-- 弹出框 -->
  <van-popup
    v-model="show"
    round
    position="bottom"
    :style="{ height: '30%' }"
  >
  <ul class="popupContainer">
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
    <li><van-icon name="friends-o" /></li>
  </ul>
  </van-popup>

  </div>
</template>
<script>
export default {
  data(){
    return {
      show:false
    }
  },
  methods:{
    dialogShow(){
      this.show = true
    },
  }
}
</script>

<style scoped>
.accountSecurity{
  position: absolute;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
}
.van-nav-bar{
  background-color: #efefef;
  
}
.van-cell--clickable{
  border: 1px solid #BBBBBB ;
}
::v-deep .van-nav-bar__text{
  color: #7e7e7e;
  font-size: 20px;
}
::v-deep .van-nav-bar .van-icon {
  color: #7e7e7e;
  font-size: 30px;
}
::v-deep .van-nav-bar__left{
  padding:0 16px 0 0px ;
}
.password{
  margin: 20px 0;
}
.verify{
  margin-bottom: 20px;
}
.login{
  margin-bottom: 10px;
}
.popupContainer{
  display: flex;
  flex-wrap: wrap;
}
.popupContainer li{
  width: 66px;
  height: 66px;
  border-radius: 50%;
  border: 1px solid red;
  text-align: center;
}

</style>