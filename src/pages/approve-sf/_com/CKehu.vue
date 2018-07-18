<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="param" :fields="fields" v-model="selectedRow">
      <div class="xc6__title" slot="left-control">客户明细</div>
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="800px">
      <fixed-table ref="tableAdd" :multiple="true" :get-data-url="config.selectUrl" :data-param="paramAdd" :fields="fieldsAdd" v-model="selectedRowAdd">
      </fixed-table>

      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭 [Esc]</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <div>{{selectedRowAdd}}</div>
  </div>
</template>
<script>
export default {
  props: {
    projectId: {},
    serviceId: {},
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getCustomerDetailsByServiceID",
        addUrl: "serviceInfo/getCustomersByProjectID",
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
          label: "商品价格"
        },
        goodsDescription: {
          label: "商品描述"
        },
        createTime: {
          label: "创建时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        conditions: {
          label: "兑换条件",
        },
      },
      fieldsAdd: {

      },
      form: {

      },
      selectedRow: {},
      selectedRowAdd: {},
    }
  },
  computed: {
    param() {
      return {
        serviceId: this.serviceId
      }
    },
    paramAdd() {
      return {
        serviceId: this.serviceId
      }
    },
  },
  methods: {
    add() {
      this.form = {};
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
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

  created() {
    this.xpost("serviceInfo/getCustomersByProjectID", {
      projectId: this.projectId,
      page: 1,
      rows: 1000
    })
  }
}
</script>

