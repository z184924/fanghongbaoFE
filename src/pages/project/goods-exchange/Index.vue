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
      <el-button @click="showDetail" icon="el-icon-document" slot="right-control">详细</el-button>
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
          <!-- <el-date-picker style="width:100%" v-model="form.postDate" value-format="yyyy-MM-dd">
          </el-date-picker> -->
          <c-date-picker v-model="form.postDate"></c-date-picker>
        </el-form-item>

      </el-form>
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isShowDetail" v-drag title="详细" width="400px">
      <table class="xc-table xc-table--border xc-table--center">
        <tr>
          <td>物品名称</td>
          <td>{{detail.goodsName}}</td>
        </tr>
        <tr>
          <td>消耗金币</td>
          <td>{{detail.goldValue}}</td>
        </tr>
        <tr>
          <td>兑换条件</td>
          <td>{{detail.conditions}}</td>
        </tr>
        <tr>
          <td>兑换时间</td>
          <td>{{mxDateFormatter(detail.exchangeDate)}}</td>
        </tr>
        <tr>
          <td>收件人</td>
          <td>{{detail.recivedMan}}</td>
        </tr>
        <tr>
          <td>收件地址</td>
          <td>{{detail.recivedAdress}}</td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td>{{detail.phone}}</td>
        </tr>
        <tr>
          <td>邮寄人</td>
          <td>{{detail.postMan}}</td>
        </tr>
        <tr>
          <td>邮寄时间</td>
          <td>{{mxDateFormatter(detail.postDate)}}</td>
        </tr>

      </table>
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
      isShowDetail: false,
      detail: {},
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
          label: "邮寄状态",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        postMan: {
          label: "邮寄人"
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
    showDetail() {
      let id = this.selectedRow[this.config.pk];
      if (id) {
        this.form = this.selectedRow;
        this.isShowDetail = true;
        this.xpost("goodsExchange/getFormJson", {
          exchangeId: id,
        }).then(res => {
          this.detail = res;
        })



        // this.form.postDate = this.form.postDate ? moment(this.form.postDate).format("YYYY-MM-DD") : "";
        // this.dialogTitle = "编辑";
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

