<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="goodsInfo/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
    </fixed-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: {
        goodsName: {
          label: "商品名称"
        },
        glodValue: {
          label: "商品价格"
        },
      },
      selectedRow: {},
    }
  },
  methods: {
    edit() { }
  }
}
</script>