<template>
  <div class="xc6 xc-shadow xc6--center">
    <div class="xc36">
      <div class="xc36__control">
        <el-button icon="el-icon-refresh" @click="getData">刷新</el-button>
      </div>
      <table class="xc-table xc-table--border">
        <tbody>
          <tr class="xc-table__head">
            <td>操作系统</td>
            <td>安装路径</td>
            <td>更新时间</td>
            <td>版本名称</td>
            <td>版本号</td>
            <td>操作</td>
          </tr>
          <tr v-for="(o,i) in list" :key="i">
            <td>{{o.installId}}</td>
            <td>{{o.installUrl}}</td>
            <td>{{mxTimeFormatter(o.updateTime)}}</td>
            <td>
              <el-input style="width:150px" v-model="o.versionName"></el-input>
            </td>
            <td>
              <el-input style="width:150px" v-model="o.versionCode"></el-input>
            </td>
            <td>
              <el-button type="primary" icon="el-icon-success" @click="update(o)">更新</el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    getData() {
      this.xpost("install/getInstallLists", {
        page: 1,
        rows: 100
      }).then(res => {
        console.log(res);
        this.list = res.rows;
      });
    },
    update(obj) {
      this.xpost("install/saveOrUpdateInstall", obj).then(res => {
        this.mxMessage(res).then(() => {
          this.getData();
        });
        // this.list = res.rows;
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
