<template>
  <div>
    <fixed-table get-data-url="user/listPageUsersByType" :data-param="dataParam" :fields="fields">
      <el-button type="primary" slot="right-control" icon="el-icon-plus" @click="add">新增内部用户</el-button>
    </fixed-table>

    <!-- dialogs -->
    <el-dialog :visible.sync="isShowAdd" width="400px" title="新增内部用户">
      <el-form ref="formAdd" :model="formAdd" label-width="6em">
        <el-form-item label="姓名">
          <el-input v-model="formAdd.nickname"></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="formAdd.username"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formAdd.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="formAdd.role"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="default" slot="footer" @click="isShowAdd=false">取消</el-button>
      <el-button type="primary" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataParam: {
        isInsider: "",
      },
      fields: {

      },

      formAdd: {

      },


      // dialogs
      isShowAdd: false,
    }
  },
  methods: {
    add() {
      this.isShowAdd = true;
    }
  }
}
</script>
