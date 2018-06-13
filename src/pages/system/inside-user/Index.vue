<template>
  <div class="xc-shadow xc6">
    <fixed-table ref="table" get-data-url="user/listPageUsersByType" :data-param="dataParam" :fields="fields" v-model="selectedRow">
      <el-button type="default" slot="right-control" icon="el-icon-plus" @click="add">新增用户</el-button>
      <el-button type="default" slot="right-control" icon="el-icon-edit" @click="edit">编辑用户</el-button>
    </fixed-table>

    <!-- dialog -->
    <el-dialog v-drag :visible.sync="isShowAdd" width="400px" title="新增内部用户">
      <el-form ref="formAdd" :model="formAdd" label-width="6em" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formAdd.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <c-select :dict="roleList" v-model="formAdd.role"></c-select>
        </el-form-item>
      </el-form>
      <el-button type="default" slot="footer" @click="isShowAdd=false">取消</el-button>
      <el-button type="primary" slot="footer" @click="doAdd">保存</el-button>
    </el-dialog>
    <el-dialog v-drag :visible.sync="isShowEdit" width="400px" title="编辑内部用户">
      <el-form ref="formEdit" :model="formEdit" label-width="6em" :rules="rules">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formEdit.phone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="formEdit.username"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <c-select :dict="roleList" v-model="formEdit.role"></c-select>
        </el-form-item>
      </el-form>
      <el-button type="default" slot="footer" @click="isShowEdit=false">取消</el-button>
      <el-button type="primary" slot="footer" @click="doEdit">保存</el-button>
      <!-- <div>{{formEdit}}</div> -->
    </el-dialog>
    <!-- <div>{{selectedRow}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      // 表格
      selectedRow: {},
      dataParam: {
        isInsider: "",
      },
      fields: {
        account: {
          label: "登录名/手机号",
          // width:"100px",
          type: "string"
        },
        userName: {
          label: "姓名",
          // width:"100px",
          type: "string"
        },
        isInsider: {
          label: "是否内部用户",
          // width:"100px",
          type: "string",
          formatter(r, c, v) {
            return v === 1 ? "是" : "-"
          }
        },
        isVIP: {
          label: "是否VIP",
          // width:"100px",
          type: "string",
          formatter(r, c, v) {
            return v === 1 ? "是" : "-"
          }
        },
        registerTime: {
          label: "注册时间",
          // width:"100px",
          type: "string",
          formatter(r, c, v) {
            return moment(v).format("YYYY-MM-DD HH:mm:ss");
          }
        },
        roleId: {
          label: "角色名称",
          // width:"100px",
          type: "string",
          formatter(r, c, v) {
            return vue.mxDictToString(vue.roleList, v);
          }
        },
      },



      // dialog
      isShowAdd: false,
      isShowEdit: false,


      roleList: [],
      rules: {
        username: [
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写手机号', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请选择角色', trigger: 'blur' }
        ],
      },

      // 新增
      formAdd: {
        role: null
      },
      formEdit: {
        role: null
      },


    }
  },
  methods: {
    add() {
      this.isShowAdd = true;
    },
    doAdd() {
      this.$refs.formAdd.validate((valid) => {
        if (valid) {
          this.xpost("user/saveInnerUser", {
            userName: this.formAdd.username,
            phone: this.formAdd.phone,
            roleId: this.formAdd.role,
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.isShowAdd = false;
              this.refreshTable();
            })
          })
        } else {
          return false;
        }
      });
    },

    // edit
    edit() {
      if (this.selectedRow.userId) {
        this.isShowEdit = true;
        this.$nextTick(() => {
          this.formEdit.role = this.selectedRow.roleId + "";
          this.formEdit.username = this.selectedRow.userName + "";
          this.formEdit.phone = this.selectedRow.phone + "";
        })
        console.log(this.formEdit);
      } else {
        this.$message({
          message: "请选择一行数据",
          type: "info"
        })
      }
    },
    doEdit() {

    },


    // table
    refreshTable() {
      this.$refs.table.getData();
    }
  },
  created() {
    this.$nextTick(() => {

      this.xpost("role/getRoles").then(res => {
        this.roleList = res.rows.map(o => {
          return {
            label: o.roleName,
            value: o.roleId + "",
          }
        })
      })
      this.refreshTable();
    })
  }
}
</script>
