<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="goldRecord/getGridListJson" :fields="fields" v-model="selectedRow">
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
    </fixed-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fields: {},
      selectedRow: {},
    }
  }
}
</script>

