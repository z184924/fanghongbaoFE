<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="goodsInfo/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="1000px">
      <table class="xc-table xc-table--border">
        <tr>
          <td style="width:5em">商品名称</td>
          <td>
            <el-input v-model="form.goodsName"></el-input>
          </td>
        </tr>
        <tr>
          <td>金币值</td>
          <td>
            <el-input-number v-model="form.glodValue" style="width:200px"></el-input-number>
          </td>
        </tr>
        <tr>
          <td>兑换条件</td>
          <td>
            <el-input v-model="form.conditions"></el-input>
          </td>
        </tr>
        <tr>
          <td>商品描述</td>
          <td>
            <!-- <div :id="uuid" style="width:100%"></div> -->
            <c-ueditor v-model="form.goodsDescription"></c-ueditor>
          </td>
        </tr>
      </table>

      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      uuid: "",
      ue: null,
      config: {
        editUrl: "goodsInfo/saveOrUpdate",
        deleteUrl: "goodsInfo/delete",
        pk: "goodsId"
      },
      dialogTitle: "编辑",

      isShowEdit: false,
      fields: {
        goodsName: {
          label: "商品名称"
        },
        glodValue: {
          label: "金币值"
        },
        // goodsDescription: {
        //   label: "商品描述"
        // },
        createTime: {
          label: "创建时间",
          formatter(r, c, v) {
            return moment(v).format("YYYY-MM-DD")
          }
        },
        conditions: {
          label: "兑换条件",
        },
      },
      form: {

      },
      selectedRow: {},
    }
  },
  methods: {
    add() {
      this.form = {};
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      if (a[this.config.pk]) {
        this.form = this.selectedRow;
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    save() {
      this.xpost(this.config.editUrl, this.form).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
        })
      })

    },
    del() {
      let row = this.selectedRow;
      if (this.selectedRow[this.config.pk]) {
        this.$confirm("是否删除？", "删除", {
          type: "warning"
        }).then(() => {
          if (row[this.config.pk]) {
            let data = {};
            data[this.config.pk] = row[this.config.pk];
            this.xpost(this.config.deleteUrl, data).then(res => {
              this.$refs.table.getData();
              this.mxMessage(res)
            })
          }
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
  },

}
</script>

