<template>
  <div class="searchProducts">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" title="综合" disabled  />
      <van-dropdown-item @change="priceChange" v-model="priceValue" title="价格" :options="option1" />
      <van-dropdown-item @change="categoryChange" v-model="categoryValue" title="分类" :options="filterCategory" />
    </van-dropdown-menu>

    <van-empty v-if="goodsList.length==0" description="没有搜索的商品" />
    <product v-else :goodsList="goodsList"></product>

  </div>
</template>
<script>
import product from "@/components/product.vue"
export default {
  data(){
    return {
      value1: 0,
      priceValue:'',
      categoryValue: 0,
      option1: [
        { text: '价格由高到低', value: "desc" },
        { text: '价格由低到高', value: "asc" },
      ],

    }
  },
  components:{
    product,
  },
  props:["filterCategory","goodsList"],

  beforeUpdate(){
    // 在数据更新之后，因此需要判断元素数据，并根据数据来判断页面渲染，遍历数据filterCategory，遇到checked为true，就把categoryValue改成数组中的value值
    this.filterCategory.map(item=> {
      if(item.checked){
        this.categoryValue = item.value
      }
    })
  },
  methods:{
    // 分类切换数据方法
    categoryChange(value){
      this.$emit("categoryChange",value)  // value便是类型id
    },
    priceChange(value){
      console.log(value);
      this.$emit("priceChange",value)  // value 表示价格排序的值
    }
  }
}
</script>

<style lang="less" scoped>
.searchProducts{
  height: calc(100% - 54px);
}
</style>>
