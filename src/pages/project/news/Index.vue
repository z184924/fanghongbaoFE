<template>
  <div class="xc6 xc-shadow">
    <fixed-table
      ref="table"
      get-data-url="projectNews/getProjectNews"
      :data-param="param"
      :fields="fields"
      v-model="selectedRow"
    >
      <div slot="left-control">
        <span>新闻标题：</span>
        <el-input dict="lbt" v-model="param.newsTitle"></el-input>
        <!-- <c-select dict="bool" v-model="selectedSfyx" style="width:100px"></c-select> -->
        <el-button type="text" @click="param.newsTitle=''">清空</el-button>
      </div>
      <el-button
        type="warning"
        @click="top"
        :icon="selectedRow.isTop===0 ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        slot="right-control"
        v-if="selectedRow.newsId"
      >{{this.selectedRow.isTop===0 ? '置顶' : '取消置顶'}}</el-button>

      <el-button
        type="warning"
        @click="publish"
        :icon="selectedRow.isPublish===0 ? 'el-icon-success' : 'el-icon-error'"
        slot="right-control"
        v-if="selectedRow.newsId"
      >{{this.selectedRow.isPublish===0 ? '发布' : '取消发布'}}</el-button>
      <!-- <el-button @click="publish(1)" type="warning" v-if="selectedRow.newsId" icon="el-icon-success" slot="right-control">发布</el-button>
      <el-button @click="publish(0)" type="warning" v-if="selectedRow.newsId" icon="el-icon-error" slot="right-control">取消发布</el-button>-->
      <div slot="right-control" style="padding:0 1em"></div>
      <el-button @click="add" icon="el-icon-plus" slot="right-control">新增</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="view" icon="el-icon-view" slot="right-control">查看新闻内容</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
      <el-table-column slot="col-first" width="150" label="图片" align="center">
        <template slot-scope="scope">
          <img class="xc16 xc-shadow" :src="$store.state.smallPicBasePath + scope.row.newsPic" alt>
        </template>
      </el-table-column>
    </fixed-table>
    <el-dialog :visible.sync="isShowEdit" v-drag title="修改" width="1000px" top="100px">
      <table v-if="isShowEdit" class="xc-table xc-table--border">
        <tbody>
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
            <td class="xc-text-center">是否置顶</td>
            <td>
              <c-select dict="bool" v-model="form.isTop"></c-select>
            </td>
          </tr>
          <tr>
            <td class="xc-text-center">新闻内容</td>
            <td>
              <c-ueditor v-if="isShowEdit" v-model="form.newsContent"></c-ueditor>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <div>{{form}}</div> -->
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isShowView" v-drag :title="`查看新闻内容`" width="1200px">
      <h1 style="text-align:center">{{formView.newsTitle}}</h1>
      <div
        v-html="mxUeditorText(formView.newsContent)"
        style="height:400px;overflow-y:scroll;padding:1em;"
      ></div>
      <div
        style="text-align:right;padding-top:10px;color:#777;"
      >发布时间：{{mxDateFormatter(formView.createTime)}}</div>
      <el-button type="default" @click="isShowView=false" slot="footer">关闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      isShowEdit: false,
      isShowView: false,
      param: {
        newsTitle: ""
      },
      fields: {
        newsTitle: {
          label: "新闻标题"
        },
        creator: {
          label: "创建人",
          width: "120px"
        },
        isTop: {
          label: "是否置顶",
          width: "100px",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        isPublish: {
          label: "是否发布",
          width: "100px",
          formatter(r, c, v) {
            return vue.mxBoolFormatter(v);
          }
        },
        createTime: {
          label: "上传时间",
          width: "240px",
          formatter(r, c, v) {
            return vue.mxTimeFormatter(v);
          }
        }
      },
      selectedRow: {},
      form: {},
      formView: {}
    };
  },
  methods: {
    add() {
      this.isShowEdit = true;
      this.form = {
        isTop: 0,
        newsId: "",
        newsPic: [],
        newsTitle: "",
        newsContent: ""
      };
    },
    top() {
      if (this.selectedRow.newsId) {
        let savedIsTop = 0;
        if (this.selectedRow.isTop + "" === "0") {
          savedIsTop = 1;
        }
        this.xpost("projectNews/setProjectNewsIsTop", {
          newsId: this.selectedRow.newsId,
          isTop: savedIsTop
        }).then(res => {
          this.mxMessage(res).then(() => {
            this.$refs.table.getData();
            this.isShowEdit = false;
          });
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    publish() {
      if (this.selectedRow.newsId) {
        let savedIsPublish = 0;
        if (this.selectedRow.isPublish + "" === "0") {
          savedIsPublish = 1;
        }
        this.xpost("projectNews/publishProjectNews", {
          newsId: this.selectedRow.newsId,
          isPublish: savedIsPublish
        }).then(res => {
          this.mxMessage(res).then(() => {
            this.$refs.table.getData();
          });
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },

    edit() {
      if (this.selectedRow.newsId) {
        this.xpost("projectNews/getSingleProjectNews", {
          newsId: this.selectedRow.newsId
        }).then(res => {
          this.form = {
            newsId: res.newsId,
            img: res.newsPic,
            title: res.newsTitle,
            isTop: res.isTop,
            newsContent: res.newsContent
          };
          if (this.form.isTop) {
            this.form.isTop = 1;
          } else {
            this.form.isTop = 0;
          }

          this.isShowEdit = true;
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
      // newsId
    },
    save() {
      this.xpost("projectNews/saveProjectNews", {
        isTop: this.form.isTop,
        newsId: this.form.newsId,
        newsPic: this.form.img,
        newsTitle: this.form.title,
        newsContent: this.form.newsContent
      }).then(res => {
        this.mxMessage(res).then(() => {
          this.$refs.table.getData();
          this.isShowEdit = false;
        });
      });
    },
    // publish(flag) {
    //   this.xpost("projectNews/publishProjectNews", {
    //     isPublish: flag,
    //     newsId: this.form.newsId,
    //   }).then(res => {
    //     this.mxMessage(res).then(() => {
    //       this.$refs.table.getData();
    //     });
    //   });
    // },
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
            });
          });
        });
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        });
      }
    },
    view() {
      if (this.selectedRow.newsId) {
        this.isShowView = true;
        this.xpost("projectNews/getSingleProjectNews", {
          newsId: this.selectedRow.newsId
        }).then(res => {
          this.formView = res;
        });
      }
    }
  }
};
</script>