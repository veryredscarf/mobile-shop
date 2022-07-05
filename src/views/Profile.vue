<template>
  <div>
      <van-row type="flex"  align="center" justify="space-between" > 
        <van-col span="8">
          <img class="profileImg" :src="imgsrc" alt="头像" >
        </van-col>
        <van-col span="12"  @click="openLoginToast">{{nickName}}</van-col>
        <van-col span="4">
          <van-icon name="arrow" />
        </van-col>
      </van-row>


    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

    <transition name="van-fade">
      <div class="logo-model" v-show="isShowLogo"  >
        <div class="close-model" @click="isShowLogo = false" ></div>
        <van-form @submit="onSubmit" class="logo-form">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </transition>
  </div>
</template>
<script>
import {GoLogin} from "@/request/api"
 export default {
  data(){
    return {
      imgsrc:require("@/assets/head.jpeg"),
      username: '',
      password: '',
      isShowLogo:false,
      nickName:'点击登录'
    };
    
  },
  created(){
    // 组件刚创建的时候，需要判断用户是否登录，获取存储的信息
    // 如果有表示用户登录了，填写用户信息
    let token =  localStorage.getItem("token")
    if(token){
      let userInfo =JSON.parse(localStorage.getItem("userInfo"))
      this.nickName = userInfo.nickname
      this.imgsrc = userInfo.avatar
    }
    
  },
  methods:{
    // 定义打开登录弹框的方法
    openLoginToast(){
    let token =  localStorage.getItem("token")
      if(!token){
        this.isShowLogo = true
      }
    },




    onSubmit(values) {
      console.log(values);
      let pwd= values['密码']
      let username= values['用户名']
      GoLogin({username, pwd})
      .then(res=>{
        console.log(res);
        // 由于后端的问题，没有注册这一功能，因此许多人登录之后，后端保存信息，后续有人用同样的账号密码等会会根据信息进行报错 ，那就再随机输入账号密码就可以
        // 登录成功之后，完成事件
        // 1.提示用户操作成功2.存储token,用户信息，3，1s后关闭弹框，4，把拿到的数据信息填写到页面上
        this.$toast.success("登录成功")
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
        setTimeout(()=>{
          this.isShowLogo = false
        },1000)

        // 如果是直接用函数传统的定时器，则需要设置保存this，箭头函数中没有this指向性
        // let _this = this
        // setTimeout(function () {
        //   _this.isShowLogo = false
        // },1000)

      this.nickName =res.data.userInfo.nickname
      this.imgsrc = res.data.userInfo.avatar



      })
    },
  }
}
</script>

<style lang="less" scoped>
.logo-model{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  background-color: #07070781;
  .logo-form{
    width: 90%;
    background-color: white;
    padding-bottom: 0.2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.2rem;
    overflow: hidden;
  }
  .close-model{
    width: 100%;
    height: 100%;
  }
}

  .profileImg{
    border-radius: 50%;
    width:50%;
    height:50%;
  }
.van-row{
  background-color:  #2a2727;
  height: 80px;
  color: rgb(219, 224, 228);
  font-size: .16rem;
  .van-col--8{
    text-align: center;
  }
  .van-col--12{
    text-align: left;
  }
  .van-col--4{
    padding-right: 20px;
    text-align: right;
  }
}
</style>