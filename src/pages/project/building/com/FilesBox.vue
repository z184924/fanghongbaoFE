<template>
  <div class="xc2">
    <div class="xc2__box-out">
      <div class="xc2__box">
        <!-- <transition-group name="el-zoom-in-center"> -->
        <div v-for="(o,i) in list" :key="i" class="xc2__img-box" :style="imgStyle">
          <img :src="$store.state.smallPicBasePath+o" alt="" :style="imgStyle" class="xc2__img" @click="openFile(o)">
          <div v-if="editable" class="xc2__close" @click="remove(i)">×</div>
        </div>
        <!-- <el-upload v-if="editable" class="avatar-uploader" :multiple="multiple" :action="action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <i v-if="multiple || list.length===0" class="el-icon-plus avatar-uploader-icon"></i>
          <i v-else class="el-icon-refresh avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- </transition-group> -->
        <div class="avatar-uploader">

          <div class="avatar-uploader">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
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
  },
  data() {
    return {
      list: [],
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
    remove(i) {
      this.$confirm("是否删除该文件夹？", "删除", {
        type: "warning"
      }).then(() => {
        let a = clone(this.list);
        a.splice(i, 1);
        this.$emit("input", a.join());
      })
    },
    openFile(src) {
      if (this.isWindow) {
        window.open(this.$store.state.picBasePath + src + "");
      } else {
        this.activeSrc = this.$store.state.picBasePath + src + "";
        this.isShowFullImg = true;
      }
    },
    showAdd() {
      this.isShowAdd = true;
    },


  },
  created() {
    this.xpost("projectPictureData/getFormJson")
  }
}
</script>
