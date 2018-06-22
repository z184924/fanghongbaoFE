<template>
  <div>
    <fixed-table ref="table" get-data-url="projectInfo/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加楼盘</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑楼盘</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">
        <span style="color:red">删除楼盘</span>
      </el-button>
    </fixed-table>
    <!-- <div>{{selectedRow}}</div> -->
  </div>
</template>
<script>

export default {
  data() {
    let vue = this;
    console.log(vue);
    return {
      fields: {
        projectName: {
          label: "楼盘名称",
          type: "string",
          // width: "120px"
        },
        sellingAverage: {
          label: "平均售价",
          type: "string",
        },
        projectAddress: {
          label: "地址",
          type: "string",
        },
        ptyj: {
          label: "佣金",
          type: "string",
          formatter(v){
            console.log(v);
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
      this.$router.push("building/add-or-edit/add")
    },
    edit() {
      if (this.isSelect) {

        this.$store.commit("setTemp", this.selectedRow);
        this.$router.push("building/add-or-edit/edit")
      } else {
        this.$message({
          type: "info",
          message: "请先选择楼盘"
        })
      }
    },
    del() {
      if (this.isSelect) {
        this.$confirm("是否删除该楼盘？", "删除").then(() => {
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