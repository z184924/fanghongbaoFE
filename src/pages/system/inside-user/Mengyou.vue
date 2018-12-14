<template>
  <div>
    <fixed-table
      ref="table"
      get-data-url="user/listPageUsersByUserId"
      :data-param="dataParamForTable"
      :fields="fields"
      v-model="selectedRow"
    >
      <span slot="left-control">
        <span>用户名：</span>
        <el-input style="width:120px" v-model="dataParam.userName"></el-input>
        <el-button type="text" @click="clearSearch">清空</el-button>
      </span>
    </fixed-table>
  </div>
</template>
<script>
export default {
  props: {
    userId: {}
  },
  data() {
    let vue=this;
    return {
      dataParam: {
        uuserName: ""
      },
      selectedRow: {},
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
      }
    };
  },
  computed: {
    dataParamForTable() {
      let p = this.dataParam;
      p.userId = this.userId;
      return p;
    }
  },
  methods: {
    clearSearch() {
      this.dataParam = {};
    }
  }
};
</script>

