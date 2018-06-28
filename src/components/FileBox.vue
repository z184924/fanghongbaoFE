<template>
  <div class="xc2" v-loading="loading">
    <div class="xc2--box-out">
      <div class="xc2--box">
        <!-- <transition-group name="el-zoom-in-center"> -->
        <div v-for="(o,i) in list" :key="i" class="xc2--img-box" :style="imgStyle">
          <img :src="$store.state.smallPicBasePath+o" alt="" :style="imgStyle" class="xc2--img" @click="openImg(o)">
          <div v-if="editable" class="xc2--close" @click="remove(i)">×</div>
        </div>
        <el-upload v-if="editable" class="avatar-uploader" :multiple="multiple" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <i v-if="multiple || list.length===0" class="el-icon-plus avatar-uploader-icon"></i>
          <i v-else class="el-icon-refresh avatar-uploader-icon"></i>
        </el-upload>
        <!-- </transition-group> -->
      </div>
    </div>
    <el-dialog append-to-body :visible.sync="isShowFullImg" fullscreen title="原图预览 (按下Esc关闭)">
      <div class="xc13" :style="{height:windowHeight-70 + 'px'}">
        <img :src="activeSrc" alt="">
      </div>
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
    multiple: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 100
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
  },
  data() {
    return {
      isShowFullImg: false,
      // loading: false,
      uploadingCount: 0,
      isShowAdd: false,
      activeSrc: "",
      form: {
        title: "",
      },
    }
  },
  computed: {
    windowHeight() {
      return this.$store.state.windowHeight;
    },
    list() {
      let a = [];
      this.value.forEach(o => {
        if (o) {
          a.push(o)
        }
      })
      return a;
    },
    loading() {
      if (this.uploadingCount === 0) {
        return false;
      } else {
        return true;
      }
    },
    action() {
      return "http://123.57.32.164:8080/common/saveFile";
    },
    imgStyle() {
      return {
        width: this.size + "px",
        height: this.size + "px",
      }
    },
    addStyle() {
      return {
        width: this.size + "px",
        height: this.size + "px",
        fontSize: this.size * 0.4 + "px",
      }
    },
    dialogWidth() {
      return "200px"
    }
  },
  methods: {
    remove(i) {
      this.$confirm("是否删除该图片？", "删除", {
        type: "warning"
      }).then(() => {
        let a = clone(this.list);
        a.splice(i, 1);
        this.$emit("input", a);
      })
    },
    openImg(src) {
      this.activeSrc = this.$store.state.picBasePath + src + "";
      this.isShowFullImg = true;
    },
    showAdd() {
      this.isShowAdd = true;
    },
    handleAvatarSuccess(res) {
      if (res.state === 'success') {
        let a = clone(this.list);
        if (!this.multiple) {
          a = [];
        }
        a.push(res.message);
        this.$emit("input", a);
        this.uploadingCount--;
        if (this.uploadingCount < 0) {
          this.uploadingCount = 0;
        }
        // 成功

      }
    },
    beforeAvatarUpload(a) {
      if (a.type.indexOf("image") < 0) {
        this.$msgbox({
          type: "error",
          title: "上传出错",
          message: "请上传图片。",
        })
        return false;
      } else {
        this.uploadingCount++;
        setTimeout(() => {
          this.uploadingCount = 0;
        }, 8000);
      }
    },

  },
}
</script>


