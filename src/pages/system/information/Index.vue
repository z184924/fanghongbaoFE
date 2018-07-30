<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" :get-data-url="config.selectUrl" :data-param="param" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" v-if="$route.params.type!=2" slot="right-control">添加</el-button>
      <el-button @click="edit" icon="el-icon-edit" v-if="$route.params.type!=2" slot="right-control">编辑</el-button>
      <el-button @click="view" icon="el-icon-view" slot="right-control">查看消息内容</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
    </fixed-table>
    <!-- <div>{{form}}</div> -->
    <el-dialog :visible.sync="isShowEdit" v-drag :title="dialogTitle" width="800px">
      <table class="xc-table xc-table--border">
        <tr>
          <td style="width:3em">标题</td>
          <td>
            <el-input v-model="form.informationTitle"></el-input>
          </td>
        </tr>
        <tr>
          <td>楼盘</td>
          <td>
            <c-select :dict="listBuilding" v-model="form.objectId"></c-select>
          </td>
        </tr>
        <tr>
          <td>内容</td>
          <td>
            <c-ueditor v-if="isShowEdit" v-model="form.informationContent"></c-ueditor>
          </td>
        </tr>
      </table>

      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭 [Esc]</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isShowView" v-drag :title="`查看消息`" width="1200px">
      <h1 style="text-align:center">{{selectedRow.informationTitle}}</h1>
      <div v-html="selectedRow.informationContent" style="height:400px;overflow-y:scroll;padding:1em;"></div>
      <div style="text-align:right;padding-top:10px;color:#777;">发布时间：{{mxDateFormatter(selectedRow.createTime)}}</div>
      <el-button type="default" @click="isShowView=false" slot="footer">关闭 [Esc]</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      // ★★★config★★★
      config: {
        selectUrl: "information/getGridListJson",
        editUrl: "information/saveOrUpdate",
        deleteUrl: "information/delete",
        pk: "informationId"
      },
      isShowView: false,
      listBuilding: [],
      dialogTitle: "编辑",
      isShowEdit: false,
      fields: {
        informationTitle: {
          label: "标题"
        },
        userName: {
          label: "发布人",
          width: "120px"
        },
        createTime: {
          label: "创建时间",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          },
          width: "150px"
        },
      },
      form: {

      },
      selectedRow: {},
    }
  },
  computed: {
    param() {
      return {
        infoType: this.$route.params.type
      };
    }
  },
  watch: {
    $route: {
      handler() {
        // console.log(this.$route.params.type);
        if (this.$route.params.type == 2) {
          this.config.selectUrl = "information/getSZGridListJson"
        } else {
          this.config.selectUrl = "information/getGridListJson"
        }
      },
      immediate: true
    }
  },
  methods: {
    add() {
      this.form = {
        // informationContent: "sdfsdf"
        infoType: this.$route.params.type
      };
      this.dialogTitle = "新增";
      this.isShowEdit = true;
    },
    edit() {
      let a = this.selectedRow;
      let id = a[this.config.pk];
      if (id) {
        this.form = this.selectedRow;
        this.dialogTitle = "编辑";
        this.isShowEdit = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    save() {
      this.xpost(this.config.editUrl, this.form).then(res => {
        this.$refs.table.getData();
        this.mxMessage(res).then(() => {
          this.isShowEdit = false;
        })
      })

    },
    del() {
      let row = this.selectedRow;
      if (this.selectedRow[this.config.pk]) {
        this.$confirm("是否删除？", "删除", {
          type: "warning"
        }).then(() => {
          if (row[this.config.pk]) {
            let data = {};
            data[this.config.pk] = row[this.config.pk];
            this.xpost(this.config.deleteUrl, data).then(res => {
              this.$refs.table.getData();
              this.mxMessage(res)
            })
          }
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    view() {
      if (this.selectedRow[this.config.pk]) {
        this.isShowView = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    }
  },

  created() {

    this.xpost("projectInfo/getGridListJson", {
      orderType: 1,
      page: 1,
      rows: 10000
    }).then(res => {
      this.listBuilding = res.rows.map(o => {
        return {
          label: o.projectName,
          value: o.projectId
        }
      })
    })
  }
}
</script>

