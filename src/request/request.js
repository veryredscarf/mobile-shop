import axios from 'axios'
import { Notify } from 'vant';


const intsance = axios.create({
  baseURL:"http://520it.com:8001",
  timeout:3000,
  headers:{
    "Content-Type":"application/json;charset=utf-8"
  }
})

// 设置请求拦截器
intsance.interceptors.request.use(config =>{
  // if(!localStorage.getItem("token")){  // 判断用户是否登录，如果没有登录则请求取消
  //   console.log(config);
  //   Notify("发送请求失败")
  //   return 
  // }else{
  //   // 如果有的话，则看需求请求是否需要携带token再进行配置
  //   config.headers.token = localStorage.getItem("token")
  //   Notify({ type: 'success', message: '请求成功，over' })
  //   return config

  // }
  return config

  // 函数执行之后，将config返回，继续完成请求
},err =>{
  return Promise.reject(err)
})


// 设置响应拦截器 ，可以在数据请求成功时嵌套非常多层时，可以采用如果是使用了elementUI框架的，可以弹出消息
//                 也可以在数据请求失败时，可以弹出错误消息
intsance.interceptors.response.use(res=>{
  const data = res.data
  if( data.errno !=0){
    // 表示请求失败
    Notify({ type: 'danger', message:`${data.errmsg?data.errmsg:'信息错误'}`});
    // return Promise.reject(data)
  }
    // Notify({ type: 'success', message:'成功'}); 

  return data
})

export default intsance