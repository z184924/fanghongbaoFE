<template>
  <div class="xc6 xc-shadow">
    <fixed-table ref="table" get-data-url="projectNews/getProjectNews" :fields="fields" v-model="selectedRow">
      <el-button @click="add" icon="el-icon-plus" slot="right-control">新增</el-button>
      <el-button @click="edit" icon="el-icon-edit" slot="right-control">编辑</el-button>
      <el-button @click="del" icon="el-icon-delete" slot="right-control" class="xc10">删除</el-button>
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
      <el-button type="default" @click="isShowEdit=false" slot="footer">关闭</el-button>
      <el-button type="primary" @click="save" slot="footer">保存</el-button>
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
      fields: {
        goodsName: {
          label: "商品名称"
        },
        glodValue: {
          label: "商品价格"
        },
      },
      selectedRow: {},
      form: {},
      uuid: "",
      ue: null,
    }
  },
  methods: {
    add() {
      this.isShowEdit = true;
      this.$nextTick().then(() => {
        setTimeout(() => {
          this.ue = UE.getEditor(this.uuid);
          this.ue.addListener('ready', (editor) => {
            this.ue.setHeight(260)
          });
        }, 10)
      })
      // 
    },
    save() {
      this.xpost("projectNews/saveProjectNews", {
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
    edit() { },
    del() { },
  },
  created() {
    this.uuid = uuid.v4();
    this.$nextTick().then(() => {

    })
  }
}
</script>