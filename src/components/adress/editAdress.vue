<template>
  <div class="editAdress">
    <div>
        <van-nav-bar title="我的收货地址" color="#7e7e7e" left-arrow @click-left="leftClick" ></van-nav-bar>
    </div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      :address-info="editCurrentAdress"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
      @change-area = "onChangeArea"
    ></van-address-edit>
  </div>
</template>
<script>
import { areaList } from '@vant/area-data';

export default {
  data(){
    return {
        areaList,
      searchResult: [],

    }
  },


  props:["editCurrentAdress"],
  methods:{
    // 参数为整个表单元素的值
    onSave(item) {
      console.log(item);
    },

    onDelete() {
      //  点击确认删除按钮，并且之后后端操作，向后端发送请求，传输地址id  也就是this.editCurrentAdress.id即可
       
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    // 选择切换地址列表触发方法
    onChangeArea(value){
      console.log(value);
      console.log(this.editCurrentAdress);
    },
    leftClick(){

      this.$emit('closeEdit')

    }
  }
}
</script>

<style scoped>
.editAdress{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 1000;
}

</style>>
