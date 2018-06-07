<template>
  <div class="xc2">
    <div class="xc2--title">{{title}}</div>
    <div class="xc2--box-out">
      <div class="xc2--box">
        <img v-for="(o,i) in list" :key="i" :src="o.imgSrc" alt="" class="xc2--img" :style="imgStyle">
        <div class="xc2--add" :style="addStyle" v-if="editable" @click="showAdd">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
      </div>
      <el-dialog :visible.sync="isShowAdd" v-dialog-drag :width="dialogWidth" title="新增">
        <el-form ref="form" :model="form" label-width="5em" v-if="mode=='file'">
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
        </el-form>
        <div class="xc2--image-upload" v-if="mode=='image'" title="点击上传图片">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div slot="footer">
          <el-button type="default" @click="isShowAdd=false">取消</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-dialog>
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
      default: "file",//file|image
    },
    editable: {
      type: Boolean,
      default: true,
    },
    size: {
      type: Number,
      default: 100
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      ueId: "",
      ue: null,
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
      if (this.mode == "file") {
        return "1200px"
      } else {
        return "400px"
      }
    }
  },
  methods: {
    save() {
      if (this.mode == "file") {
        console.log(this.ue.getContent());
      } else {


      }
    },
    showAdd() {
      this.isShowAdd = true;
      if (this.mode == 'file') {
        this.$nextTick(() => {
          this.ue = null;
          this.ue = UE.getEditor(this.ueId, {
            autoHeightEnabled: false,
            initialFrameHeight: 300
          });
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isImg = (file.type === 'image/jpeg' || file.type === 'image/png');
      // const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isImg;
    }
  },
  created() {
    this.ueId = uuid.v4();
  }
}
</script>


