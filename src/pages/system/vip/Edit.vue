<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag append-to-body :title="dialogTitle" width="400px">
      <el-form ref="form" :model="form" label-width="7em">
        <el-form-item v-if="formType=='add'" label="总金额">
          <el-input-number v-model="form.totalAmount" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="交易类型">
          <c-select v-model="form.tradeType" dict="jylx"></c-select>
        </el-form-item>
        <el-form-item label="VIP套餐">
          <c-select v-model="form.vipId" dict="vipRule"></c-select>
        </el-form-item>
        <el-form-item v-if="formType=='add'" label="套餐月数">
          <el-input-number v-model="form.monthValue" style="width:100%"></el-input-number>
        </el-form-item>
        <el-form-item label="vip开始日期">
          <c-date-picker v-model="form.vipStartTime"></c-date-picker>
        </el-form-item>
        <el-form-item label="vip结束日期">
          <c-date-picker v-model="form.vipEndTime"></c-date-picker>
        </el-form-item>
        <el-form-item label="交易状态">
          <c-select v-model="form.Status" dict="jyzt"></c-select>
        </el-form-item>
        <el-form-item label="操作端">
          <c-select v-model="form.handleType" dict="czd"></c-select>
        </el-form-item>
      </el-form>
      <!-- <div>{{form}}</div> -->
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    userId: {
      default: ""
    },
    vipStart: {
      default: 0
    },
    vipEnd: {
      default: 0
    }
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "payOrderRequest/getGridListVipHistory",
        editUrl: "payOrderRequest/saveOrUpdate",
        deleteUrl: "",
        pk: "merOrderId"
      },
      formType: "",
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        vipName: {
          label: "套餐名称"
        },
        tradeType: {
          label: "交易类型",
          formatter(r, c, v) {
            return vue.mxDictToString(v, "jylx");
          }
        },
        handleType: {
          label: "操作端",
          formatter(r, c, v) {
            return vue.mxDictToString(v, "czd");
          }
        },
        Status: {
          label: "交易状态",
          formatter(r, c, v) {
            return vue.mxDictToString(v, "jyzt");
          }
        },
        vipStartTime: {
          label: "VIP开始时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        vipEndTime: {
          label: "VIP结束时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        }
      },
      form: {},
      selectedRow: {}
    };
  },
  computed: {
    param() {
      return {
        userId: this.userId
      };
    }
  },
  methods: {
    add() {
      this.form = {};
      this.dialogTitle = "添加";
      this.formType = "add";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        this.form = this.selectedRow;
        this.dialogTitle = "编辑";
        this.formType = "edit";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    save() {
      if (this.vipStart) {
        this.form.parentVipStartTime =
          moment(this.vipStart).format("YYYY-MM-DD") + " 00:00:00";
      }
      if (this.vipEnd) {
        this.form.parentVipEndTime =
          moment(this.vipEnd).format("YYYY-MM-DD") + " 00:00:00";
      }
      this.form.userId = this.userId;
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

  mounted() {
    console.log(this.$store.state.dict);
  }
};
</script>

