import $http from './request'

// 定义获取首页信息
export  const GetHomeList = () => $http.get("/index/index") 

// 获取搜索框热门，历史等信息
export  const GetSearchList = () => $http.get("/search/index") 

// 获取搜索关键字信息返回的数据
export  const GetSearchInfoData= (params) => $http.get(`/search/helper`,{params}) 


/**
 * get 请求中有两种传参的方式
 *    第一种是在url后面拼接字段，进行数据传输
 *              const GetSearchInfoData= (data) => $http.get(`/search/helper?keyword=${data}`)
 *    第二种是以params的方式进行传递，get请求的第二个参数就是params，但是params是一个对象
 *            其中开发中衍生出两种封装方法，
 *                第一种是在定义请求api的时候，对数据进行封装成一个对象、如这种
 *                  export  const GetSearchInfoData= (data) => $http.get(`/search/helper`,{
                                params:{
                                  keyword:data
                                }
                              }) 
 *                第二种是在调用请求api的时候，对数据进行封装成一个对象传入
 *                  export  const GetSearchInfoData= (data) => $http.get(`/search/helper`,{params:data}) 
 *                    再运用es6的对象简写 
 *                      export  const GetSearchInfoData= (params) => $http.get(`/search/helper`,{params}) 
 *                  这种写法在处理同一类型get请求时十分方便，只需要更改地址即可         
 * 
 */

// 获取搜索商品的数据
export  const GetSearchGoodData= (params) => $http.get(`/goods/list`,{params}) 


// 设置清除历史搜索记录接口
export  const clearHistoryData= () => $http.get(`/search/clearhistory`) 


// 封装登录请求
export const GoLogin = params => $http.post("/auth/loginByWeb",params)
// 封装获取商品信息请求
export const GetGoodInfo = params => $http.get("/goods/detail",{params})