import $http from './request'

// 获取首页信息方法
export  const GetHomeList = () => $http.get("/index/index") 

// 获取搜索框热门，历史等信息方法
export  const GetSearchList = () => $http.get("/search/index") 

// 获取搜索关键字信息返回的数据方法
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

// 获取搜索商品的数据方法
export  const GetSearchGoodData= (params) => $http.get(`/goods/list`,{params}) 


// 设置清除历史搜索记录接口方法
export  const clearHistoryData= () => $http.get(`/search/clearhistory`) 


// 封装登录请求方法
export const GoLogin = params => $http.post("/auth/loginByWeb",params)

// 获取商品信息请求方法
export const GetGoodInfo = params => $http.get("/goods/detail",{params})

// 获取根据某商品id获取相关产品推荐数据请求方法
export const GetRelatedGoodInfo = params => $http.get("/goods/related",{params})


// 获取购物拦产品数量信息方法
export const GetCartInfo = () => $http.get("/cart/goodscount")


// 商品加入购物车的方法
export const addPutCart = params => $http.post("/cart/add",params)

// 获取购物车所有商品信息的方法
export const GetCartGoodsList = () => $http.get("/cart/index")

// 设置购物车商品切换选中状态的方法

// 请求的目的：告诉后端我们改变了那些值，后端接受值之后，返回给我们一个完整的页面数据，只需要将数据重新渲染在页面上即可
export const ChangeCartGoodsList = params => $http.post("/cart/checked",params)




