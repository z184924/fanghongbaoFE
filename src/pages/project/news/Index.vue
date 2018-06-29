<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectNews/getProjectNews" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">新增</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="view" icon="el-icon-view" slot="right-control">查看新闻内容</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
      <el-table-column slot="col" width="150" label="图片" align="center">
        <template slot-scope="scope">
          <img class="xc16 xc-shadow" :src="$store.state.smallPicBasePath + scope.row.newsPic" alt="">
        </template>
      </el-table-column>
    </fixed-table>
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="1000px">
      <table class="xc-table x-border">
        <tr>
          <td class="xc-text-center" style="width:7em">新闻标题</td>
          <td>
            <el-input v-model="form.title"></el-input>
          </td>
        </tr>
        <tr>
          <td class="xc-text-center">新闻缩略图</td>
          <td>
            <file-box v-model="form.img" :multiple="false"></file-box>
          </td>
        </tr>
        <tr>
          <td class="xc-text-center">新闻内容</td>
          <td>
            <div style="width:100%" :id="uuid"></div>
          </td>
        </tr>
      </table>
      <!-- <div>{{form}}</div> -->
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isShowView" v-drag :title="`查看新闻内容 【${selectedRow.newsTitle}】`" width="1200px">
      <h1 style="text-align:center">{{selectedRow.newsTitle}}</h1>
      <div v-html="selectedRow.newsContent" style="height:400px;overflow-y:scroll"></div>
      <div style="text-align:right;padding-top:10px;color:#777;">发布时间：{{dateFormat(selectedRow.createTime)}}</div>
      <el-button type="default" @click="isShowView=false" slot="footer">关闭</el-button>

    </el-dialog>
  </div>
</template>
<script>
// import ue from "u"
import uuid from "uuid"
export default {
  data() {
    return {
      isShowEdit: false,
      isShowView: false,
      fields: {
        newsTitle: {
          label: "新闻标题"
        },
        creator: {
          label: "创建人"
        },
        createTime: {
          label: "上传时间",
          formatter(r, c, v) {
            return moment(v).format("YYYY-MM-DD")
          }
        },
      },
      selectedRow: {},
      form: {},
      uuid: "",
      ue: null,
    }
  },
  methods: {
    dateFormat(v) {
      return moment(v).format("YYYY-MM-DD HH:mm:ss")
    },
    add() {
      this.isShowEdit = true;
      this.form = {
        newsId: "",
        newsPic: [],
        newsTitle: "",
        newsContent: ""
      };
      this.$nextTick().then(() => {
        setTimeout(() => {
          if (this.ue) {
            this.ue.destroy();
          }
          this.ue = UE.getEditor(this.uuid);
          this.ue.addListener('ready', (editor) => {
            this.ue.setHeight(200)
            this.ue.setContent("")
          });
        }, 10)
      })
      // 
    },
    save() {
      this.xpost("projectNews/saveProjectNews", {
        newsId: this.form.newsId,
        newsPic: this.form.img.join(),
        newsTitle: this.form.title,
        newsContent: this.ue.getContent()
      }).then(res => {
        this.mxMessage(res).then(() => {
          this.$refs.table.getData();
          this.isShowEdit = false;
        })
      })
    },
    edit() {
      if (this.selectedRow.newsId) {

        this.xpost("projectNews/getSingleProjectNews", {
          newsId: this.selectedRow.newsId
        }).then(res => {
          this.form = {
            newsId: res.newsId,
            img: [res.newsPic],
            title: res.newsTitle,
            newsContent: res.newsContent
          };
          this.isShowEdit = true;
          this.$forceUpdate();
          this.$nextTick().then(() => {
            setTimeout(() => {
              if (this.ue) {
                this.ue.destroy();
              }
              this.ue = UE.getEditor(this.uuid);
              this.ue.addListener('ready', (editor) => {
                this.ue.setHeight(200);
                this.ue.setContent(this.form.newsContent)
              });
            }, 10)
          })
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
      // newsId
    },
    del() {
      if (this.selectedRow.newsId) {
        this.$confirm("是否删除？", "删除", {
          type: "warning"
        }).then(() => {
          this.xpost("projectNews/deleteProjectNews", {
            newsId: this.selectedRow.newsId
          }).then(res => {
            this.mxMessage(res).then(() => {
              this.$refs.table.getData();
              this.isShowEdit = false;
            })
          })
        })
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    view() {
      if (this.selectedRow.newsId) {
        this.isShowView = true;
      }
    }
  },
  created() {
    this.uuid = uuid.v4();
  }
}
</script>