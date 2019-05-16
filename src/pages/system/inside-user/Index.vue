<template>
  <div class="xc-shadow xc6">
    <fixed-table
      ref="table"
      get-data-url="user/listPageUsersByType"
      :data-param="dataParam"
      :fields="fields"
      v-model="selectedRow"
    >
      <div slot="left-control" style="flex:1 0 0%">
        <div class="xc34">
          <span>用户类型：</span>
          <c-select :dict="searchInsiderList" v-model="dataParam.isInsider" style="width:120px"></c-select>
          <span style="padding-left:1em">用户名：</span>
          <el-input style="width:120px" v-model="dataParam.userName"></el-input>
          <span style="padding-left:1em">手机号：</span>
          <el-input style="width:120px" v-model="dataParam.phone"></el-input>
          <span style="padding-left:1em">角色：</span>
          <c-select :dict="roleList" v-model="dataParam.roleId" style="width:120px"></c-select>
          <span style="padding-left:1em">楼盘：</span>
          <c-select
            :disabled="dataParam.isInsider!='1'"
            :dict="listBuilding"
            v-model="dataParam.projectId"
            style="width:150px"
          ></c-select>
          <el-button type="text" @click="clearSearch">清空</el-button>
        </div>
        <div class="xc35">
          <el-button
            type="default"
            icon="el-icon-info"
            @click="openMengyou"
            :disabled="selectedRow.count+''=='0' || !selectedRow.userId"
          >查看盟友</el-button>
          <el-button
            type="default"
            icon="el-icon-setting"
            @click="setDirector"
            :disabled="selectedRow.roleName!=='拓展经纪人'"
          >{{setDirectorLabel}}</el-button>
          <el-button type="default" icon="el-icon-plus" @click="add">新增</el-button>
          <el-button type="default" icon="el-icon-edit" @click="edit">编辑</el-button>
          <el-button type="default" icon="el-icon-warning" @click="leave">离职</el-button>
          <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
          <el-button type="default" icon="el-icon-delete" class="xc10" @click="del">删除</el-button>
        </div>
      </div>
    </fixed-table>
    <!-- dialog -->
    <el-dialog v-drag :visible.sync="isShowAdd" width="400px" title="新增内部用户">
      <el-form ref="formAdd" :model="formAdd" label-width="6em" :rules="rulesAdd">
        <el-form-item label="账号" prop="account">
          <el-input v-model="formAdd.account"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formAdd.userName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <c-select :dict="roleList" v-model="formAdd.role"></c-select>
        </el-form-item>
      </el-form>
      <el-button type="default" slot="footer" @click="isShowAdd=false">取消</el-button>
      <el-button type="primary" slot="footer" @click="doAdd" :disabled="!formAdd.role">保存</el-button>
    </el-dialog>
    <el-dialog v-drag :visible.sync="isShowEdit" width="400px" title="编辑内部用户">
      <el-form ref="formEdit" :model="formEdit" label-width="6em" :rules="rulesEdit">
        <el-form-item label="账号" prop="account">
          <!-- <el-input v-model="formEdit.account"></el-input> -->
          <span>{{formEdit.account}}</span>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="formEdit.userName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <c-select :dict="roleList" v-model="formEdit.role"></c-select>
        </el-form-item>
      </el-form>
      <el-button type="default" slot="footer" @click="isShowEdit=false">取消</el-button>
      <el-button type="primary" slot="footer" @click="doEdit" :disabled="!formEdit.role">保存</el-button>
      <!-- <div>{{formEdit}}</div> -->
    </el-dialog>
    <el-dialog v-drag :visible.sync="isShowDirector" width="200px" title="设置拓展主管">
      <div v-if="isShowDirector">
        <c-select :dict="listDirector" v-model="selectedDirector"></c-select>
      </div>
      <el-button type="primary" slot="footer" @click="saveDirector">保存</el-button>
    </el-dialog>
    <el-dialog v-drag :visible.sync="isShowMengyou" width="80%" title="盟友">
      <c-mengyou v-if="isShowMengyou" :user-id="selectedRow.userId"></c-mengyou>
    </el-dialog>

    <!-- <div>{{exchangedDirectorState}}</div> -->
    <!-- <div>{{selectedRow}}</div> -->
  </div>
</template>
<script>
import CMengyou from "./Mengyou";
export default {
  components: {
    CMengyou
  },
  data() {
    let vue = this;
    return {
      isShowMengyou: false,
      listBuilding: [],

      // 表格
      searchInsiderList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "内部用户",
          value: "1"
        },
        {
          label: "外部用户",
          value: "0"
        }
      ],
      selectedRow: {},
      dataParam: {
        projectId: "",
        isInsider: "1",
        // userName: "",
        // roleId: ""
      },
      // formDirector:[],
      listDirector: [],
      selectedDirector: "",
      fields: {
        phone: {
          label: "手机号",
          // width:"100px",
          type: "string"
        },
        account: {
          label: "登录名",
          type: "string"
        },
        userName: {
          label: "姓名",
          type: "string"
        },
        isInsider: {
          label: "是否内部用户",
          type: "string",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        // isVIP: {
        //   label: "是否VIP",
        //   type: "string",
        //   formatter(r, c, v) {
        //     return vue.mxBoolFormatter(v);
        //   }
        // },
        registerTime: {
          label: "注册时间",
          type: "string",
          formatter(r, c, v) {
            return vue.mxTimeFormatter(v);
          }
        },
        roleName: {
          label: "角色名称",
          type: "string"
        },
        count: {
          label: "盟友个数",
          type: "string",
          width: "90px"
        }
      },

      // dialog
      isShowAdd: false,
      isShowEdit: false,
      isShowDirector: false,
      roleList: [],
      rulesAdd: {
        account: [{ required: true, message: "请填写账号", trigger: "blur" }],
        userName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      rulesEdit: {
        account: [{ required: true, message: "请填写账号", trigger: "blur" }],
        userName: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },

      // 新增
      formAdd: {},
      formEdit: {}
    };
  },

  computed: {
    exchangedDirectorState() {
      let a = this.selectedRow.isSetDirector;
      if (a === 1) {
        return 0;
      } else {
        return 1;
      }
    },
    setDirectorLabel() {
      let a = this.selectedRow.isSetDirector;
      if (a === 1) {
        return "取消拓展主管";
      } else {
        return "设置拓展主管";
      }
    }
  },
  watch: {
    "dataParam.isInsider"() {
      console.log(this.dataParam.isInsider);
      if (this.dataParam.isInsider != "1") {
        this.dataParam.projectId = "";
      }
    }
  },
  methods: {
    setDirector() {
      if (this.exchangedDirectorState === 1) {
        this.xpost("user/getDirectorList").then(res => {
          this.listDirector = res.rows.map(o => {
            return {
              value: o.userId,
              label: o.userName
            };
          });
          this.isShowDirector = true;
        });
      } else {
        this.saveDirector();
      }
    },
    saveDirector() {
      let save = () => {
        this.xpost("user/setDirector", {
          jUserId: this.selectedRow.userId,
          tUserId: this.selectedDirector,
          stype: this.exchangedDirectorState
        }).then(res => {
          this.mxMessage(res).then(() => {
            this.selectedDirector = "";
            this.isShowDirector = false;
            this.$refs.table.getData();
          });
        });
      };
      if (this.exchangedDirectorState === 0) {
        this.$confirm(
          `是否取消 [ ${this.selectedRow.userName} ] 的拓展主管？`,
          "取消拓展主管"
        ).then(() => {
          save();
        });
      } else {
        save();
      }
    },
    add() {
      this.isShowAdd = true;
    },
    doAdd() {
      this.$refs.formAdd.validate(valid => {
        if (valid) {
          this.xpost("user/saveInnerUser", {
            account: this.formAdd.account,
            userName: this.formAdd.userName,
            phone: this.formAdd.phone,
            roleId: this.formAdd.role
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.isShowAdd = false;
              this.refreshTable();
            });
          });
        } else {
          return false;
        }
      });
    },

    // edit
    edit() {
      if (this.selectedRow.userId) {
        if (this.selectedRow.isInsider == 1) {
          this.isShowEdit = true;
          this.$nextTick(() => {
            this.$set(this.formEdit, "role", this.selectedRow.roleId + "");
            this.$set(
              this.formEdit,
              "userName",
              this.selectedRow.userName + ""
            );
            this.$set(this.formEdit, "phone", this.selectedRow.phone + "");
            this.$set(this.formEdit, "account", this.selectedRow.account + "");
            // this.formEdit.role = this.selectedRow.roleId + "";
            // this.formEdit.userName = this.selectedRow.userName + "";
            // this.formEdit.phone = this.selectedRow.phone + "";
            // this.formEdit.account = this.selectedRow.account + "";
          });
        } else {
          this.$message({
            message: "只能编辑内部用户",
            type: "info"
          });
        }
        // console.log(this.formEdit);
      } else {
        this.$message({
          message: "请选择一行数据",
          type: "info"
        });
      }
    },
    leave() {
      if (this.selectedRow.userId) {
        console.log(this.selectedRow);
        this.$confirm(
          `是否将 ${this.selectedRow.userName}(${
            this.selectedRow.roleName
          }) 设置离职？   内部用户离职，将角色改为经纪人；如果为拓展经纪人离职，则删除其盟友关系。`,
          "离职",
          {
            type: "warning"
          }
        ).then(() => {
          this.xpost("user/userLeave", {
            userId: this.selectedRow.userId,
            roleId: this.selectedRow.roleId
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.refreshTable();
            });
          });
        });
      } else {
        this.$message({
          message: "请选择一行数据",
          type: "info"
        });
      }
    },
    doEdit() {
      console.log(this.formEdit);
      this.$forceUpdate();
      this.$refs.formEdit.validate(valid => {
        if (valid) {
          this.xpost("user/updateInnerUser", {
            userId: this.selectedRow.userId,
            // account: this.formEdit.account,
            userName: this.formEdit.userName,
            phone: this.formEdit.phone,
            roleId: this.formEdit.role
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.isShowEdit = false;
              this.refreshTable();
            });
          });
        } else {
          return false;
        }
      });
    },
    del() {
      let row = this.selectedRow;
      if (this.selectedRow.userId) {
        this.$confirm(`是否删除 [ ${this.selectedRow.userName} ] ？`, "删除", {
          type: "warning"
        }).then(() => {
          let data = {};
          data.userId = row.userId;
          this.xpost("user/deleteUser", data).then(res => {
            this.mxMessage(res).then(() => {
              this.refreshTable();
            });
          });
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    clearSearch() {
      this.dataParam = {};
    },

    // table
    refreshTable() {
      this.$refs.table.getData();
    },
    openMengyou() {
      this.isShowMengyou = true;
    }
  },
  created() {
    this.$nextTick(() => {
      this.xpost("role/getRoles").then(res => {
        let list = res.rows.map(o => {
          return {
            label: o.roleName,
            value: o.roleId + ""
          };
        });
        list.unshift({
          label: "全部",
          value: ""
        });
        let l = [];
        list.forEach(o => {
          if (o.label != "经纪人") {
            l.push(o);
          }
        });
        this.roleList = l;
      });
      this.xpost("projectInfo/getGridListJson", {
        orderType: 1,
        page: 1,
        rows: 10000
      }).then(res => {
        console.log(res);
        this.listBuilding = res.rows.map(o => {
          return {
            label: o.projectName,
            value: o.projectId
          };
        });
        this.listBuilding.unshift({
          label: "全部",
          value: ""
        });
      });
      this.refreshTable();
    });
  }
};
</script>
