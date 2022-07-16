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
      
      <van-grid-item @click="itemClick" icon="label-o" text="订单" />
      <van-grid-item @click="itemClick" icon="bill-o" text="优惠券" />
      <van-grid-item @click="itemClick" icon="goods-collect-o" text="礼品卡" />
      <van-grid-item @click="itemClick" icon="location-o" text="我的收藏" />
      <van-grid-item @click="itemClick" icon="flag-o" text="我的足迹" />
      <van-grid-item @click="itemClick" icon="photo-o" text="会员福利" />
      <van-grid-item @click="itemClick" icon="aim" text="地址管理" />
      <van-grid-item @click="itemClick" icon="warn-o" text="账号安全" />
      <van-grid-item @click="itemClick" icon="service-o" text="联系客服" />
      <van-grid-item @click="itemClick" icon="photo-o" text="帮助中心" />
      <van-grid-item @click="itemClick" icon="smile-comment-o" text="意见反馈" />
    </van-grid>

    <transition name="van-fade">
      <div class="logo-model" v-show="isShowLogo"  >
        <div class="close-model" @click="isShowLogo = false" ></div>
        <van-form @submit="onSubmit" class="logo-form">






          <!-- <van-row style="background-color:white;height: auto;" justify="space-between" align="center">
            <van-col span="18"> -->
              <van-field
                v-model="username"
                name="手机号"
                label="手机号"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写用户手机号' }]"
          />
            <!-- </van-col>
            <van-col span="6">
              <van-button round type="default" :disabled= 'isBtn' >验证码</van-button>
            </van-col>
          </van-row> -->




         <van-row style="background-color:white;height: auto;" justify="space-between" align="center">
            <van-col span="18">
              <van-field
                v-model="password"
                type="password"
                name="验证码"
                label="验证码"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请填写验证码' }]"
              />
            </van-col>
            <van-col span="6">
              <van-button round type="default" :disabled= 'isBtn' >验证码</van-button>
            </van-col>
          </van-row>



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
      nickName:'点击登录',
      // 发送验证码按钮是否可用
      isBtn:false
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
    // 图标点击事件
    itemClick(){
      this.$toast.fail("功能暂未开放")
    },



    onSubmit(values) {
      let pwd= values['手机号']
      let username= values['验证码']
      console.log(pwd,username);

      // GoLogin({username, pwd})
      // .then(res=>{
      //   console.log(res);
      //   // 由于后端的问题，没有注册这一功能，因此许多人登录之后，后端保存信息，后续有人用同样的账号密码等会会根据信息进行报错 ，那就再随机输入账号密码就可以
      //   // 登录成功之后，完成事件
      //   // 1.提示用户操作成功2.存储token,用户信息，3，1s后关闭弹框，4，把拿到的数据信息填写到页面上
      //   this.$toast.success("登录成功")
      //   localStorage.setItem("token",res.data.token)
      //   localStorage.setItem("userInfo",JSON.stringify(res.data.userInfo))
      //   setTimeout(()=>{
      //     this.isShowLogo = false
      //   },1000)

        // 如果是直接用函数传统的定时器，则需要设置保存this，箭头函数中没有this指向性
        // let _this = this
        // setTimeout(function () {
        //   _this.isShowLogo = false
        // },1000)

      this.nickName =res.data.userInfo.nickname
      this.imgsrc = res.data.userInfo.avatar



      // })
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
    border-radius: 0.23rem;
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
  .van-button{
    display: inline-block;
    width: 100%;
    border: none;
  }
}
</style>