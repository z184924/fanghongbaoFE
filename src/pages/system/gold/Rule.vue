<template>
  <div class="xc6 xc-shadow">
    <!-- <div class="xc6__title">金币规则</div> -->
    <fixed-table ref="table" get-data-url="goldRule/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
    </fixed-table>
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="400px">
      <table class="xc-table xc-table--border">
        <tr class="xc-table__head">
          <td>动作</td>
          <td>金币值</td>
        </tr>
        <tr v-for="(o,i) in table" :key="i">
          <td>{{o.action}}</td>
          <td>
            <el-input-number v-model="o.value"></el-input-number>
          </td>
        </tr>
      </table>
      <!-- <div>{{table}}</div> -->
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowEdit: false,
      table: [],
      fields: {
        action: {
          label: "动作"
        },
        ruleType: {
          label: "金币类型",
          formatter(r, c, v) {
            return v === 1 ? "获取金币" : "消耗"
          }
        },
        value: {
          label: "金币数值",
          formatter(r, c, v) {
            if (v === 0) {
              return "-"
            } else {
              return v;
            }
          }
        },
      },
      selectedRow: {},
    }
  },
  methods: {
    edit() {
      this.isShowEdit = true;
      this.xpost("goldRule/getGridListJson", {
        page: 1,
        rows: 100
      }).then(res => {
        this.table = res.rows;
        let index = -1;
        this.table.forEach((o, i) => {
          if (o.actionCode === "shopping") {
            index = i;
          }
        })
        this.table.splice(index, 1);
      })
    },
    save() {
      let list = this.table.map(o => {
        return `${o.value},${o.actionCode}`;
      })
      let data = list.join("#")
      // console.log(data);
      this.xpost("goldRule/edit", {
        dataList: data
      }).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
        })
      })
    }
  },
  created() {
    // this.xpost("goldRule/getGridListJson")
  }
}
</script>

