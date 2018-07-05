<template>
  <div class="xc6 xc-shadow">
    <div class="xc6__title" v-if="isShowTitle">用户金币记录</div>
    <fixed-table ref="table" get-data-url="goldRecord/getGridListJson" :fields="fields" v-model="selectedRow">
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
    </fixed-table>
  </div>
</template>
<script>
export default {
  props: {
    isShowTitle: {
      default: false
    }
  },
  data() {
    return {
      fields: {},
      selectedRow: {},
    }
  }
}
</script>

