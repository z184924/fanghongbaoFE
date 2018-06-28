<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectNews/getProjectNews" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">新增</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
    </fixed-table>
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="600px">
      <table class="xc-table x-border">
        <tr>
          <td></td>
        </tr>
      </table>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
// import ue from "u"
export default {
  data() {
    return {
      isShowEdit: false,
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
    add() {
      this.isShowEdit = true;
      // projectNews/saveProjectNews
    },
    save() {

    },
    edit() { }
  },
  created() {
    this.$nextTick().then(()=>{
      setTimeout(()=>{
        var ue = UE.getEditor('container');

      },500)
    })
    console.log(ue);
  }
}
</script>