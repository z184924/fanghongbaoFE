<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div class="xc6__title" slot="left-control">客户明细（{{name}}）</div>
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加客户</el-button> -->
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除客户</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="800px">
      <fixed-table
        ref="tableAdd"
        v-if="isShowEdit"
        :multiple="true"
        :get-data-url="config.addUrl"
        :data-param="paramAdd"
        :fields="fieldsAdd"
        v-model="selectedRowAdd"
      ></fixed-table>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <!-- <div>{{selectedRowAdd}}</div> -->
  </div>
</template>
<script>
export default {
  props: {
    name: {},
    projectId: {},
    accountantId: {}
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getCustomerDetailsByServiceID",
        addUrl: "serviceInfo/getCustomersByProjectID",
        editUrl: "serviceInfo/saveCustomerDetail",
        deleteUrl: "serviceInfo/deleteCustomerByDetailID",
        pk: "detailId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        customerName: {
          label: "客户"
        },
        buildingNum: {
          label: "楼层"
        },
        dealDate: {
          label: "成交日期",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        subscribeDate: {
          label: "认购日期",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        }
      },
      fieldsAdd: {
        customerName: {
          label: "客户"
        },
        buildingNum: {
          label: "楼层"
        },
        dealDate: {
          label: "成交日期",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        subscribeDate: {
          label: "认购日期",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        }
      },
      form: {},
      selectedRow: {},
      selectedRowAdd: {}
    };
  },
  watch: {
    selectedRow: {
      handler() {
        // console.log(this.selectedRow);
        this.$emit("input", this.selectedRow);
      },
      deep: true
    }
  },
  computed: {
    param() {
      return {
        accountantId: this.accountantId
      };
    },
    paramAdd() {
      return {
        projectId: this.projectId
      };
    }
  },
  methods: {
    add() {
      this.form = {
        accountantId: this.accountantId
      };
      this.dialogTitle = "新增";
      this.isShowEdit = true;
      this.$nextTick(() => {
        this.$refs.tableAdd.getData();
      });
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
        });
      }
    },
    save() {
      this.form.customerIds = this.selectedRowAdd
        .map(o => {
          return o.customerId;
        })
        .join();
      this.xpost(this.config.editUrl, this.form).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
        });
      });
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
              this.mxMessage(res);
            });
          }
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    }
  },
  beforeDestroy() {
    this.$emit("input", {});
  },
  created() {
    this.xpost("serviceInfo/getCustomersByProjectID", {
      projectId: this.projectId,
      serviceId: this.serviceId,
      page: 1,
      rows: 1000
    });
    this.$emit("input", {});
  }
};
</script>

