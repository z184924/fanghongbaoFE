<template>
  <div class="xc2">
    <div class="xc2__box-out">
      <div class="xc2__box">
        <!-- <transition-group name="el-zoom-in-center"> -->
        <div v-for="(o,i) in dataList" :key="i" class="xc2__img-box" :style="imgStyle">
          <img src="@/assets/img/wjj.png" alt="" :style="imgStyle" class="xc2__img xc2__img--folder" @click="edit(o)">
          <div class="xc2__img-title" :title="o.dataTitle" @click="edit(o)">{{o.dataTitle}}</div>
          <div v-if="editable" class="xc2__close" @click="del(o)">×</div>
        </div>
        <!-- <el-upload v-if="editable" class="avatar-uploader" :multiple="multiple" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <i v-if="multiple || list.length===0" class="el-icon-plus avatar-uploader-icon"></i>
          <i v-else class="el-icon-refresh avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- </transition-group> -->
        <div class="avatar-uploader" @click="add">
          <div class="el-upload">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="isShowEdit" title="新增/修改" v-drag width="1000px">
      <div v-if="isShowEdit">
        <table class="xc-table">
          <tr>
            <td>标题</td>
            <td>
              <el-input v-model="form.dataTitle"></el-input>
            </td>
          </tr>
          <tr>
            <td>内容</td>
            <td>
              <c-ueditor v-model="form.dataContent"></c-ueditor>
            </td>
          </tr>
        </table>
      </div>
      <el-button slot="footer" type="default" @click="isShowEdit=false">取消</el-button>
      <el-button slot="footer" type="primary" @click="save">保存</el-button>

    </el-dialog>
  </div>
</template>
<script>
import uuid from "uuid"
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    projectId: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 100
    },
    dataList: {}
  },
  data() {
    return {
      list: [],
      isShowEdit: false,
      form: {},
    }
  },
  computed: {
    imgStyle() {
      return {
        // width: this.size + "px",
        height: this.size + "px",
      }
    },
  },
  methods: {
    add() {
      this.form.dataId = "";
      this.form.projectId = this.projectId;
      this.isShowEdit = true;
    },
    edit(o) {
      // this.form.dataId = o.dataId;
      // this.form.projectId = this.projectId;
      this.form = o;
      this.isShowEdit = true;
    },
    save() {
      this.xpost("projectPictureData/saveOrUpdate", this.form).then(res => {
        this.mxMessage(res).then(() => {
          // this.form = {};
          // this.isShowEdit = false;
          window.location.reload();
        })
        // console.log(res);
      })
    },
    del(o) {
      this.$confirm("是否删除？", "删除").then(() => {

        this.xpost("projectPictureData/saveOrUpdate", {
          dataId: o.dataId
        }).then(res => {
          this.mxMessage(res).then(() => {
            // this.form = {};
            // this.isShowEdit = false;
            window.location.reload();
          })
          // console.log(res);
        })
      })
    },



  }
}
</script>
