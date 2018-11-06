<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div class="xc6__title" slot="left-control">结算明细</div>
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="400px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="5em"></el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    serviceId: {}
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getUserAccountantByDetailID",
        editUrl: "",
        deleteUrl: "",
        pk: "accountantId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        roleName: {
          label: "结算对象",
          width: "auto"
        },
        userName: {
          label: "姓名",
          width: "auto"
        },
        serverValue: {
          label: "服务费",
          width: "auto"
        },
        personalTax: {
          label: "个税",
          width: "auto"
        },
        surePrize: {
          label: "应发奖金",
          width: "auto"
        },
        realPrize: {
          label: "实发奖金",
          width: "auto"
        },
        keepValue: {
          label: "留存",
          width: "auto"
        },
        remark: {
          label: "备注",
          width: "auto"
        },
        count: {
          label: "客户个数",
          width: "auto"
        }
      },
      form: {},

      selectedRow: {}
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
        serviceId: this.serviceId
      };
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
    this.$emit("input", {});
  }
};
</script>

