import $http from './request'

export  const GetHomeList = () => $http.get("/index/index") 