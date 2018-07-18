<template>
  <div class="xc6 xc-shadow">
    <div class="xc20">
      <div class="xc20__side">
        <div class="xc6__title">结算明细</div>
      </div>
      <div class="xc20__side xc20__side--right">
        <el-button type="primary" @click="save" slot="footer">保存</el-button>
        <el-button type="default" @click="getData" icon="el-icon-refresh" circle title="刷新数据"></el-button>
      </div>
    </div>
    <div class="xc21">
      <table class="xc-table xc-table--border xc-table--center">
        <tr class="xc-table__head">
          <td>结算对象</td>
          <td>服务奖金</td>
          <td>个税</td>
          <td>留存</td>
          <td>实际服务奖金</td>
        </tr>
        <tr v-for="(o,i) in table" :key="i">
          <td>{{o.f__jsdx}}</td>
          <td>
            <el-input-number :controls="false" style="width:auto" v-model="o.f__data"></el-input-number>
          </td>
          <td>
            <el-input-number :controls="false" style="width:auto" v-model="o.f__data"></el-input-number>
          </td>
          <td>
            <el-input-number :controls="false" style="width:auto" v-model="o.f__data"></el-input-number>
          </td>
          <td>
            <el-input-number :controls="false" style="width:auto" v-model="o.f__data"></el-input-number>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    detailId: {}
  },
  data() {
    return {
      table: [
        {
          f__jsdx: "专员",
          f__data: 0,
        },
        {
          f__jsdx: "主管",
          f__data: 0,
        },
        {
          f__jsdx: "项目经理",
          f__data: 0,
        },
        {
          f__jsdx: "区域经理",
          f__data: 0,
        },
        {
          f__jsdx: "总监",
          f__data: 0,
        },
      ]
    }
  },
  watch: {
    detailId() {
      this.getData();
    }
  },
  methods: {
    save() {

    },
    getData() {
      this.xpost("serviceInfo/getUserAccountantByDetailID", {
        detailId: this.detailId,
        page: 1,
        rows: 1000
      })
    }
  },
  created() {

  }
}
</script>

