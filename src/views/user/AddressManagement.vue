<template>
  <div class="adressMangement">
        <van-nav-bar title="我的收货地址" color="#7e7e7e" left-arrow @click-left="$router.go(-1)" ></van-nav-bar>

    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    >
      <editAdress v-show="test" :editCurrentAdress = "editCurrentAdress"  v-model="value" @closeEdit="ListenCloseEdit" ></editAdress>
  

    </van-address-list>

  </div>
</template>
<script>
import editAdress from "@/components/adress/editAdress.vue"
export default {
  data(){
    return {
      test:false,
      chosenAddressId: '1',
      // value是editAdress组件(子组件)传来的值
      value:{},
      // 定义当前选中编辑的元素值
      editCurrentAdress:{},
      // 定义当前选中编辑的元素下标
      editCurrentIndex:null, 
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
          areaCode:"330106",   // 用于后面自动显示省市区选择
          addressDetail:"文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: '2',
          name: '李四',
          tel: '13198265714',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
          isDefault: false,  // 表示是否是默认地址
          areaCode:"110101",  
          addressDetail:"莫干山路 50 号"
        },
      ],
      disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
          
        },
      ],
    }
  },
  components:{
    editAdress
  },
    methods: {
    onAdd() {
      this.$toast('新增地址');
    },
    onEdit(item, index) {
      // index表示这个数组在数组中的下标，后面方便替换
      
      this.test = true
      console.log(item);
      this.editCurrentAdress = item
 

    },
    // 监听子组件左箭头的点击事件，如果点击了，就让子组件消失
    ListenCloseEdit(){
      this.test = false
    }
  },
}
</script>

<style scoped>
.adressMangement{
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
.van-address-list{
  height: calc(100vh - 96px);
  overflow-y: scroll;
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

</style>


