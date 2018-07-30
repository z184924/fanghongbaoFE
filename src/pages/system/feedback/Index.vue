<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectFeedback/getGridListJson" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">添加意见</el-button>
      <el-button @click="detail" icon="el-icon-document" slot="right-control">意见详细</el-button>
      <!-- <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button> -->
    </fixed-table>
    <el-dialog :visible.sync="isShowInsert" v-drag title="添加意见">
      <div class="xc14">
        <div class="xc14__title">意见内容：</div>
        <el-input type="textarea" :rows="5" v-model="content"></el-input>
        <div style="height:10px"></div>
        <div class="xc14__title">相关图片：</div>
        <div class="xc14__file">
          <file-box v-model="listFile"></file-box>
        </div>
      </div>
      <!-- <div>{{listFile}}</div> -->
      <el-button type="default" slot="footer" @click="isShowInsert=false">关闭</el-button>
      <el-button type="primary" slot="footer" @click="doAdd">保存</el-button>
    </el-dialog>
    <el-dialog :visible.sync="isShowDetail" v-drag title="意见详情">
      <div class="xc14">
        <div class="xc14__title">意见内容：</div>
        <div class="xc14__content" v-html="detailContent"></div>
        <div style="height:10px"></div>
        <div class="xc14__title">相关图片：</div>
        <div class="xc14__file">
          <file-box v-model="DetailListFile" :editable="false" v-if="DetailListFile.length>0"></file-box>
          <div v-else>暂无图片</div>
        </div>
      </div>
      <!-- <div>{{listFile}}</div> -->
      <el-button type="default" slot="footer" @click="isShowDetail=false">关闭</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let vue = this;
    return {
      fields: {
        userName: {
          label: "用户",
          width: "120px",
        },
        content: {
          label: "内容",
          align: "left",
          class: "xc15",
          formatter(r, c, v) {
            v = v.replace(/<br>/g, " ");
            return v;
          }
        },
        feedbackTime: {
          label: "反馈时间",
          width: "160px",
          formatter(r, c, v) {
            return vue.mxDateFormatter(v);
          }
        }
      },
      selectedRow: {},
      isShowInsert: false,
      content: "",
      listFile: [],

      isShowDetail: false,
      detailContent: "",
      DetailListFile: [],
    }
  },
  methods: {
    add() {
      this.isShowInsert = true;
    },
    doAdd() {
      this.xpost("projectFeedback/save", {
        content: this.content.replace(/\n/g, "<br>"),
        fileName: this.listFile.join()
      }).then(res => {
        this.mxMessage(res).then(() => {
          this.isShowInsert = false;
          this.content = "";
          this.listFile = [];
          this.$refs.table.getData();
        })
      })
    },
    detail() {
      if (this.selectedRow.feedbackId) {
        this.detailContent = this.selectedRow.content;
        this.DetailListFile = this.selectedRow.fileName.split(",");
        this.isShowDetail = true;
      } else {
        this.$message({
          type: "info",
          message: "请选择一行数据"
        })
      }
    },
    del() { },
  },
  created() {
  }
}
</script>


