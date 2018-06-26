<template>
  <div>
    <div class="xc12">
      <div class="xc12--item xc-shadow" :class="{'x-no-user':o.count===0}" v-for="(o,i) in listRole" :key="i" @click="showUser(o)">
        <div class="xc12--title">{{o.roleName}}</div>
        <div class="xc12--count">人数：{{o.count}}</div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowDialog" v-drag title="用户列表">
      <table class="xc-table x-border">
        <tr class="x-head">
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
          <td>{{format(o.registerTime)}}</td>
          <td>{{o.isInsider === 1?YES:NO}}</td>
          <td>{{o.isVIP === 1?YES:NO}}</td>
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
    showUser(o) {
      if (o.count > 0) {
        this.users = o.users;
        this.isShowDialog = true;
      }
    },
    format(t) {
      return moment(t).format('YYYY-MM-DD');
    }
  },
  created() {
    this.xpost("role/getRoles").then(res => {
      this.listRole = res.rows;
      this.listRole.forEach(o => {
        o.count = "..";
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

