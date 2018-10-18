<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      :get-data-url="config.selectUrl"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div slot="left-control">
        <span>姓名：</span>
        <!-- <c-select dict="bool" v-model="selectedSfyx" style="width:100px"></c-select> -->
        <el-input v-model="param.userName"></el-input>
        <el-button type="text" @click="param.userName=''">清空</el-button>
      </div>
      <!-- <el-button @click="add" icon="el-icon-plus" slot="right-control">添加</el-button> -->
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">VIP配置</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag append-to-body :title="dialogTitle" width="1200px">
      <!-- <el-form ref="form" :model="form" label-width="5em">
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
      </el-form>-->
      <c-edit
        v-if="isShowEdit"
        :user-id="selectedRow.userId"
        :vip-start="selectedRow.vipStartTime"
        :vip-end="selectedRow.vipEndTime"
      ></c-edit>
      <!-- <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>-->
    </el-dialog>
  </div>
</template>
<script>
import CEdit from "./Edit";
export default {
  components: {
    CEdit
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "user/getlistPagejUsers",
        editUrl: "",
        deleteUrl: "",
        pk: "userId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        userName: {
          label: "姓名"
        },
        phone: {
          label: "电话"
        },
        roleId: {
          label: "角色",
          formatter(r, c, v) {
            return vue.mxDictToString(v, "roles");
          }
        },
        isVIP: {
          label: "是否VIP",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
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
        this.dialogTitle = "VIP配置";
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

  mounted() {
    console.log(this.$store.state.dict);
  }
};
</script>

