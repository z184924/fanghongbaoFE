
<template>
  <div>
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
        <el-button @click="pass" icon="el-icon-check" slot="right-control" type="primary">提交审核</el-button>
        <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
      </fixed-table>
      <!-- <div>{{selectedMingxi}}</div> -->
      <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="400px">
        <el-form ref="form" v-if="isShowEdit" :model="form" label-width="5em">
          <el-form-item label="楼盘">
            <c-select :dict="listBuilding" v-model="form.projectId"></c-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="form.f__date"
              value-format="yyyy-MM"
              style="width:160px"
              type="month"
              placeholder="选择月"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <!-- <div>{{selectedMingxi}}</div> -->
        <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
        <el-button type="primary" @click="save" slot="footer">保存</el-button>
      </el-dialog>
    </div>
    <div style="height:2em"></div>
    <div class="xc19">
      <div class="xc19__side xc19__side--long">
        <transition name="el-zoom-in-center">
          <div v-if="selectedRow.projectId">
            <c-jiesuan ref="jiesuan" :service-id="selectedRow.serviceId" v-model="selectedMingxi"></c-jiesuan>
          </div>
        </transition>
      </div>
      <div class="xc-gap"></div>
      <div class="xc19__side">
        <transition name="el-zoom-in-center">
          <div v-if="selectedMingxi.accountantId && selectedRow.projectId">
            <c-kehu
              :project-id="selectedRow.projectId"
              :service-id="selectedRow.serviceId"
              :user-id="selectedMingxi.userId"
              :accountant-id="selectedMingxi.accountantId"
              :name="selectedMingxi.userName"
              @save="kehuSaved"
            ></c-kehu>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import CKehu from "./CKehu";
import CJiesuan from "./CJiesuan";
export default {
  components: {
    CKehu,
    CJiesuan
  },
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "serviceInfo/getGridListJson",
        editUrl: "serviceInfo/saveOrUpdate",
        deleteUrl: "serviceInfo/______",
        pk: "serviceId"
      },
      dialogTitle: "编辑",
      isShowEdit: false,
      listBuilding: [],
      fields: {
        projectName: {
          label: "楼盘名称"
        },
        recordYear: {
          label: "日期",
          formatter(r, c, v) {
            return `${r.recordYear}年${r.recordMonth}月`;
          }
        },
        userName: {
          label: "用户"
        },
        recordDate: {
          label: "记录时间",
          formatter(r, c, v) {
            return vue.mxTimeFormatter(v);
          }
        }
      },
      form: {
        recordIdState: 0
      },
      selectedRow: {},
      selectedKehu: {},
      selectedMingxi: {},
      param: {
        recordIdStates: 0
      }
    };
  },
  methods: {
    add() {
      this.form = {
        recordIdState: 0
      };
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        let form = clone(this.selectedRow);
        form.f__date = moment(
          `${form.recordYear}-${form.recordMonth}-1`
        ).format("YYYY-MM");
        this.form = form;
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
        this.$forceUpdate();
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    save() {
      let arrayDate = this.form.f__date.split("-");
      this.form.recordYear = arrayDate[0];
      this.form.recordMonth = arrayDate[1];
      // this.form.recordIdState = 0;
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
    },
    pass() {
      let row = this.selectedRow;
      if (this.selectedRow[this.config.pk]) {
        this.$confirm("是否提交审核？", "提交审核", {
          type: "info"
        }).then(() => {
          if (row[this.config.pk]) {
            let data = {};
            data[this.config.pk] = row[this.config.pk];
            data.recordIdState = 2;
            this.xpost("serviceInfo/submitCheckInfo", data).then(res => {
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
    },
    kehuSaved(){
      this.$refs.jiesuan.getData();
      // console.log(this.$refs.jiesuan);
    }
  },

  created() {
    this.xpost("projectInfo/getGridListJson", {
      orderType: 1,
      page: 1,
      rows: 10000
    }).then(res => {
      this.listBuilding = res.rows.map(o => {
        return {
          label: o.projectName,
          value: o.projectId
        };
      });
    });
  }
};
</script>




























