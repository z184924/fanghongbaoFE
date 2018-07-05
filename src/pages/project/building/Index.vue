<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectInfo/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加楼盘</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑楼盘</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除楼盘</el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    let vue = this;
    return {
      fields: {
        projectName: {
          label: "楼盘名称",
          width:"200px",
          type: "string",
        },
        sellingAverage: {
          label: "平均售价",
          type: "string",
        },
        projectAddress: {
          label: "地址",
          width:"260px",
          type: "string",
          class: "xc15",
        },
        ptyj: {
          label: "普通会员佣金",
          type: "string",
          formatter(v) {
            if (v.commissionType === 0) {
              return v.generalCommission + "元"
            } else {
              return v.generalCommissionBL + "%"
            }
          }
        },
        vipyj: {
          label: "VIP佣金",
          type: "string",
          formatter(v) {
            if (v.commissionType === 0) {
              return v.vipCommission + "元"
            } else {
              return v.vipCommissionBL + "%"
            }
          }
        },
        ifRecommend: {
          label: "是否推荐",
          width:"80px",
          formatter(r, c, v) {
            if (v === 1) {
              return vue.YES
            } else {
              return vue.NO
            }
          }
        },
        recommendTime: {
          label: "推荐时间",
          formatter(r, c, v) {
            return moment(v).format("YYYY-MM-DD")
          }
        },
      },
      selectedRow: {},
    }
  },
  computed: {
    isSelect() {
      if (this.selectedRow.projectId === undefined) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    add() {
      this.$router.push("building/add-or-edit/add/_")
    },
    edit() {
      if (this.isSelect) {
        this.$store.commit("setTemp", this.selectedRow);
        // console.log(this.selectedRow);
        this.$router.push(`building/add-or-edit/edit/${this.selectedRow.projectId}`)
      } else {
        this.$message({
          type: "info",
          message: "请先选择楼盘"
        })
      }
    },
    del() {
      if (this.isSelect) {
        this.$confirm("是否删除该楼盘？", "删除", {
          type: "warning"
        }).then(() => {
          this.xpost("projectInfo/delete", {
            projectId: this.selectedRow.projectId
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.$refs.table.getData();
            });
          })
        });
      } else {
        this.$message({
          type: "info",
          message: "请先选择楼盘"
        })
      }
    }
  }
}
</script>