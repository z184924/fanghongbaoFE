<template>
  <div>
    <fixed-table
      v-if="activeTab==='tab1'"
      ref="table"
      :get-data-url="config.selectUrl"
      :fields="fields"
      v-model="selectedRow"
      :data-param="param"
    >
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="400px">
      <el-form ref="form" v-if="isShowEdit" :model="form" label-width="5em">
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="form.glodValue" style="width:200px"></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="form.goodsDescription"></el-input>
        </el-form-item>
        <el-form-item label="兑换条件">
          <el-input v-model="form.conditions"></el-input>
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
        selectUrl: "projectCustomer/getGridListJson",
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
          label: "兑换条件"
        }
      },
      activeTab: "tab1",
      form: {},
      selectedRow: {},
      param: {
        customerStatusIds: 10,
        ifReception: 1
      }
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
      if (a[this.config.pk]) {
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

