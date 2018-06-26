<template>
  <div class="xc2" v-loading="loading">
    <!-- <div class="xc2--title">{{title}}</div> -->
    <div class="xc2--box-out">
      <div class="xc2--box">
        <transition-group name="el-zoom-in-center">
          <div v-for="(o,i) in list" :key="i" class="xc2--img-box" :style="imgStyle">
            <img :src="$store.state.smallPicBasePath+o" alt="" :style="imgStyle" class="xc2--img" @click="openImg(o)">
            <div class="xc2--close" @click="remove(i)">×</div>
          </div>
        </transition-group>
        <el-upload class="avatar-uploader" multiple :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
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
      // loading: false,
      uploadingCount: 0,
      isShowAdd: false,
      form: {
        title: "",
      },
      imageUrl: ""
    }
  },
  computed: {
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
      // if (this.mode == "file") {
      // } else {
      //   return "400px"
      // }
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
      window.open(this.$store.state.picBasePath + src + "");
    },
    showAdd() {
      this.isShowAdd = true;
    },
    handleAvatarSuccess(res) {
      if (res.state === 'success') {
        let a = clone(this.list);
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


