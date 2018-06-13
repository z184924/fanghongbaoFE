<template>
  <c-panel :title-color="titleColor" :width="width" :title="title">

    <div class="xc2">
      <!-- <div class="xc2--title">{{title}}</div> -->
      <div class="xc2--box-out">
        <div class="xc2--box">
          <img v-for="(o,i) in value" :key="i" :src="o.imgSrc" alt="" class="xc2--img" :style="imgStyle">
          <el-upload class="avatar-uploader" multiple action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <div class="xc2--add" :style="addStyle" v-if="editable" @click="showAdd">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div> -->
        </div>
        <el-dialog :visible.sync="isShowAdd" v-drag :width="dialogWidth" title="新增">
          <!-- <el-form ref="form" :model="form" label-width="5em" v-if="mode=='file'">
            <el-form-item label="标题：" size="medium">
              <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：">
              <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="说明：">
              <div :id="ueId"></div>
            </el-form-item>
          </el-form> -->
          <!-- <div class="xc2--image-upload" title="点击上传图片">

          </div> -->
          <div slot="footer">
            <el-button type="default" @click="isShowAdd=false">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </c-panel>
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
    titleColor: {
      type: String,
      default: "rgb(39, 78, 151)",
    },
    width: {
      type: String,
      default: "800px",
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
    save() {
      this.value.push({
        id: "a111a",
        imgSrc: "/static/tx.jpg"
      });
      this.$emit("input", value);
    },
    showAdd() {
      this.isShowAdd = true;
    },

  }
}
</script>


