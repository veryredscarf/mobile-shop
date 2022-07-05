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

1：在根据搜索内容get请求数据时，必填的字段是keyword，
        order字段表示返回的数据按照某样顺序：desc表示价格由高到低，asc表示数据从低到高排序
        categoryId字段表示类别，因为搜索时可以根据商品的请求分类来返回数据，
        sort字段方便后端识别，默认是id也就是分类     有两个值：id表示分类id，price表示价格排序  
        在获取搜索数据默认值只需要设置keyword字段
        在设置价格排序数据请求时，需要额外设置两个字段sort：pr ice，order：值
        在设置分类数据请求时，需要设置额外两个字段sort：id，categoryId：值
```


### 关于由于vue-router ：在路由下，在触发跳转相同路由的时候报错 （/home路由往/home路由跳转报错）
```
原因：版本错误3.2.0
解决办法: 1：vue-router降级处理：vue-router 3.0.7 （不推荐）
          2：在push方法之后添加捕获异常的方式,并且不处理  （这种方式不是很推荐）
              @click="$router.push('/home/searchPopup').catch(err=>{})"
          3：在router原型上添加catch()处理方法，这段代码写在router/index.js中  (推荐)

```
### 关于项目的webpack环境需要设置成4.42.0，如果是webpack5，项目在编译时，则会报错
```
版本回退到webpacl 4.42.0
```
### 定义在路由信息mate中数据信息：
```
    activeNum用于帮助tabbar切换，
    tabIsShow用于判断tarbar在某些路由中是否显示
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
