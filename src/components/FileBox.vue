<template>
  <div class="xc2">
    <!-- <div class="xc2--title">{{title}}</div> -->
    <div class="xc2--box-out">
      <div class="xc2--box">
        <img v-for="(o,i) in value" :key="i" :src="$store.state.smallPicBasePath+o" alt="" class="xc2--img" :style="imgStyle" @click="openImg(o)">
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
    mode: {
      type: String,
      default: "image",//file|image
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
      isShowAdd: false,
      form: {
        title: "",
      },
      imageUrl: ''
    }
  },
  computed: {
    action() {
      return this.mxApi("projectInfo/saveFile");
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
    openImg(src){
      window.open(this.$store.state.picBasePath + src);
    },
    showAdd() {
      this.isShowAdd = true;
    },
    handleAvatarSuccess(res) {
      console.log(res);
      if (res.state === 'success') {
        this.value.push(res.message);
        this.$emit("input", this.value);
        // 成功

      }
    },
    beforeAvatarUpload() {

    },

  }
}
</script>


