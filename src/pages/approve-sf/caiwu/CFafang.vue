<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="param" :fields="fields" v-model="selectedRow">
      <div class="xc6__title" slot="left-control">发放记录</div>
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <!-- <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button> -->
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="300px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="5em">
        <el-form-item label="金额">
          <el-input-number style="width:100%" v-model="form.serviceValue"></el-input-number>
        </el-form-item>
        <el-form-item label="日期">
          <!-- <el-date-picker style="width:100%" v-model="form.serviceDate" value-format="yyyy-MM-dd">
          </el-date-picker> -->
          <c-date-picker v-model="form.serviceDate"></c-date-picker>
        </el-form-item>
      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    accountantId: {}
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getMoneyrecordListJson",
        editUrl: "serviceInfo/saveMoneyrecord",
        deleteUrl: "serviceInfo/deleteMoneyrecord",
        pk: "moneyrecordId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        serviceValue: {
          label: "金额",
          width: "auto",
        },
        serviceDate: {
          label: "日期",
          width: "auto",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
      },
      form: {

      },
      selectedRow: {},
    }
  },
  computed: {
    param() {
      return {
        accountantId: this.accountantId
      }
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
        let form = clone(this.selectedRow);
        form.serviceDate = form.serviceDate ? this.mxDateFormatter(form.serviceDate) : ""
        this.form = form;
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
      this.form.accountantId = this.accountantId;
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

  }
}
</script>

