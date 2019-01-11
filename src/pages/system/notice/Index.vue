<template>
  <div class="xc6 xc-shadow xc6--center" style="width:500px">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div slot="left-control">
        <!-- <span>用户名：</span>
        <el-input v-model="param.userName"></el-input>
        <el-button type="text" @click="param.userName=''">清空</el-button>-->
      </div>
      <el-button @click="add" icon="el-icon-plus" slot="right-control">新增</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑文字</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="1200px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="5em">
        <el-form-item label="类型">
          <el-input v-model="form.noticeType"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <!-- <el-input-number v-model="form.glodValue" style="width:200px"></el-input-number> -->
          <c-ueditor v-model="form.noticeContent"></c-ueditor>
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
        selectUrl: "notice/getNoticeLists",
        editUrl: "notice/saveOrUpdateNotice",
        deleteUrl: "",
        pk: "noticeId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        noticeType: {
          label: "类别"
        }
        // glodValue: {
        //   label: "商品价格"
        // },
        // goodsDescription: {
        //   label: "商品描述"
        // },
        // createTime: {
        //   label: "创建时间",
        //   formatter(r, c, v) {
        //     return vue.mxDateFormatter(v);
        //   }
        // },
        // conditions: {
        //   label: "兑换条件"
        // }
      },
      form: {},
      param: {},
      selectedRow: {}
    };
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

  created() {}
};
</script>

