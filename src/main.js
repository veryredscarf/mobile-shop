import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'reset-css'   // 安装全局自动清除样式


import { Button,Stepper,Search,SwipeItem,Swipe,Lazyload,Icon,Tag,List,Cell, DropdownMenu, DropdownItem,Empty,Toast, Tabbar, TabbarItem,
Col, Row,Grid, GridItem,Form,Field,Divider,GoodsAction, GoodsActionIcon, GoodsActionButton,Sku, Checkbox, CheckboxGroup,Card,SubmitBar,
SwipeCell,Sidebar, SidebarItem,Image as VanImage,Loading,Pagination,Tab, Tabs,NavBar,Popup,ShareSheet,AddressList,AddressEdit,Area
} from 'vant';





// 定义全局过滤器，对金钱进行转换
Vue.filter("changeRMB",val=>{    // changeRMB表示过滤器名字
  // return `￥${val}.00元`
  return `￥${Number(val).toFixed(2)}元` // 保存两位小数
})


Vue.use(Area);
Vue.use(AddressEdit);
Vue.use(AddressList);

Vue.use(ShareSheet);
Vue.use(Popup);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(VanImage);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(SwipeCell);
Vue.use(Stepper);
Vue.use(SubmitBar);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Sku);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Divider);
Vue.use(Field);
Vue.use(Form);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Toast);
Vue.use(Empty);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Cell);
Vue.use(List);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Lazyload);
Vue.use(Search);
Vue.use(Button)
Vue.use(Stepper)
Vue.use(SwipeItem)
Vue.use(Swipe)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
