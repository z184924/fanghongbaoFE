<template>
  <div>
    <div class="xc12">
      <div class="xc12__item xc-shadow" :class="{'x-no-user':o.count===0}" v-for="(o,i) in listRole" :key="i" @click="showUser(o)">
        <div class="xc12__title">{{o.roleName}}</div>
        <div class="xc12__count">{{o.count}}人</div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowDialog" v-drag title="用户列表">
      <table class="xc-table xc-table--border">
        <tr class="xc-table__head">
          <td>账户</td>
          <td>姓名</td>
          <td>电话</td>
          <td>注册时间</td>
          <td>是否内部用户</td>
          <td>是否VIP</td>
        </tr>
        <tr v-for="(o,i) in users" :key="i">
          <td>{{o.account}}</td>
          <td>{{o.userName}}</td>
          <td>{{o.phone}}</td>
          <td>{{mxDateFormatter(o.registerTime)}}</td>
          <td>{{boolToString(o.isInsider)}}</td>
          <td>{{boolToString(o.isVIP)}}</td>
        </tr>
      </table>
    </el-dialog>
    <!-- <div>{{listRole}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      listRole: [],
      users: [],
      isShowDialog: false,
    }
  },
  methods: {
    boolToString(b) {
      if (b + '' === '0') {
        return this.NO;
      } else if (b + '' === '1') {
        return this.YES
      } else {
        return ""
      }
    },
    showUser(o) {
      if (o.count > 0) {
        this.users = o.users;
        this.isShowDialog = true;
      }
    }
  },
  created() {
    this.xpost("role/getRoles").then(res => {
      this.listRole = res.rows;
      this.listRole.forEach(o => {
        o.count = 0;
        o.users = [];
        this.xpost("user/getUsersByRoleID", {
          roleId: o.roleId,
        }).then(res2 => {
          o.count = res2.rows.length;
          o.users = res2.rows;
          this.$forceUpdate();
        })
      })
    })
  }
}
</script>

