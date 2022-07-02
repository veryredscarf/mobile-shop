 # mobile-shop 

## Project setup
```
npm install  
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
### 安装依赖的包名
```
reset-css 用于清除css默认的样式；vant2  适合vue2的vantUI框架
```
### 接口地址
```
http://520it.com:8001/
```
### 接口文档
```
http://520it.com:8001/
```

### 关于由于vue-router ：在路由下，在触发跳转相同路由的时候报错 （/home路由往/home路由跳转报错）
```
原因：版本错误3.2.0
解决办法: 1：vue-router降级处理：vue-router 3.0.7 （不推荐）
          2：在push方法之后添加捕获异常的方式,并且不处理  （这种方式不是很推荐）
              @click="$router.push('/home/searchPopup').catch(err=>{})"
          3：在router原型上添加catch()处理方法，这段代码写在router/index.js中  (推荐)

```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
