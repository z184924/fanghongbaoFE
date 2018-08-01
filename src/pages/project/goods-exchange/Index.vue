<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="param" :fields="fields" v-model="selectedRow">
      <div slot="left-control">
        <span>用户名：</span>
        <!-- <c-select dict="bool" v-model="selectedSfyx" style="width:100px"></c-select> -->
        <el-input v-model="param.userName"></el-input>
        <el-button type="text" @click="param.userName=''">清空</el-button>
      </div>
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="400px">
      <el-form ref="form" :model="form" label-width="5em">
        <el-form-item label="是否邮寄">
          <c-select v-model="form.isPost" dict="bool" type="radio"></c-select>
        </el-form-item>
        <el-form-item label="邮寄人">
          <el-input v-model="form.postMan"></el-input>
        </el-form-item>
        <el-form-item label="邮寄日期">
          <el-date-picker style="width:100%" v-model="form.postDate" value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>

      </el-form>
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
      config: {
        selectUrl: "goodsExchange/getGridListJson",
        editUrl: "goodsExchange/edit",
        deleteUrl: "goodsExchange/delete",
        pk: "exchangeId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        goodsName: {
          label: "物品"
        },
        goldValue: {
          label: "物品金币值"
        },
        userName: {
          label: "用户"
        },
        exchangeDate: {
          label: "兑换时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        isPost: {
          label: "是否邮寄",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        postMan: {
          label: "收件人"
        },
        postDate: {
          label: "邮寄时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        },
        // goodsName: {
        //   label: "商品名称"
        // },
        // glodValue: {
        //   label: "商品价格"
        // },
        // goodsDescription: {
        //   label: "商品描述"
        // },
        // createTime: {
        //   label: "创建时间",
        //   formatter(r, c, v) {
        //     return moment(v).format("YYYY-MM-DD")
        //   }
        // },
        // conditions: {
        //   label: "兑换条件",
        // },
      },
      param: {
        userName: ""
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
        this.form.postDate = this.form.postDate ? moment(this.form.postDate).format("YYYY-MM-DD") : "";
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

  }
}
</script>

