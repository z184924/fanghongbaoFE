<template>
  <div class="xc1 xc-shadow">
    <div class="xc1__title">
      <!-- <i class="ii i-red-packet" style="color:#e33;font-size:30px;padding-right:20px;"></i> -->
      <img src="@/assets/img/logo.png" alt="" class="xc1__logo">
      <span>{{title}}</span>
    </div>
    <div class="xc1__center"></div>
    <div class="xc1__control xc1__control--text">
      <i class="ii i-yonghu"></i>
      <span style="padding:0 3px;">{{mxLoginInfo.nickname}}</span>
    </div>
    <div class="xc1__control" title="消息" @click="mxDevAlert">
      <el-badge :value="0" :max="99" class="">
        <i class="ii i-xiaoxi"></i>
        <span style="padding:0 3px;">消息</span>
      </el-badge>
    </div>
    <div class="xc1__control" title="提醒" @click="mxDevAlert">
      <el-badge :value="0" :max="99" class="">
        <i class="ii i-tixing"></i>
        <span style="padding:0 3px;">提醒</span>
      </el-badge>
    </div>
    <div class="xc1__control" @click="fullScreen">
      <i class="ii i-quanping"></i>
      <span style="padding:0 3px;">全屏</span>
    </div>
    <div class="xc1__control" @click="changePassword">
      <i class="ii i-mima"></i>
      <span style="padding:0 3px;">修改密码</span>
    </div>
    <div class="xc1__control" style="color:#a00" @click="mxLogout">
      <i class="ii i-zhuxiao"></i>
      <span style="padding:0 3px;">注销</span>
    </div>
    <el-dialog :visible.sync="isShowChangePassword" title="修改密码" v-drag width="400px">
      <div v-if="isShowChangePassword">
        <el-form ref="form" :model="form" label-width="5em">
          <el-form-item label="电话号">
            <!-- <el-input-number style="width:100%" v-model="form.serviceValue"></el-input-number> -->
            <span>{{mxLoginInfo.phone}}</span>
          </el-form-item>
          <!-- <el-form-item label="旧密码">
            <el-input type="password" v-model="form.oldPassword"></el-input>
          </el-form-item>-->
          <el-form-item label="新密码">
            <el-input type="password" v-model="form.newPassword"></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="form.validNumber" style="width:200px"></el-input>
            <el-button
              style="width:90px"
              @click="getValidNumber"
              :disabled="daojishi>0"
            >{{validButtonText}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="doChangePassword" slot="footer">确定</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "房红包后台管理系统",
      isShowChangePassword: false,
      form: {},
      daojishi: 0,
      daojishiTimer: null
    };
  },
  computed: {
    validButtonText() {
      if (this.daojishi > 0) {
        return `剩余（${this.daojishi}）`;
      } else {
        return "获取验证码";
      }
    }
  },
  methods: {
    fullScreen() {
      let docElm = document.documentElement;
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      this.$message({
        type: "success",
        message: "按下 ESC 键即可退出全屏模式"
      });
    },
    changePassword() {
      // console.log(this.mxLoginInfo);
      this.isShowChangePassword = true;
    },
    doChangePassword() {
      // console.log(this.form);
      let data = {};
      data.phone = this.mxLoginInfo.phone;
      data.phoneCode = this.form.validNumber;
      data.password = this.form.newPassword;
      this.xpost("findPwd", data).then(res => {
        this.mxMessage(res).then(() => {
          this.isShowChangePassword = false;
        });
      });
    },
    startDaojishi() {
      this.daojishi = 30;
      this.daojishiTimer = setInterval(() => {
        this.daojishi--;
        if (this.daojishi == 0) {
          clearInterval(this.daojishiTimer);
        }
      }, 1000);
    },
    getValidNumber() {
      this.xpost("user/getVerificationCode", {
        phone: this.mxLoginInfo.phone
      }).then(res => {
        console.log(res);
      });
      this.startDaojishi();
    }
  },
  created() {
    if (this.mxDevMode) {
      this.title = "[ 开发环境 ]";
    }
  }
};
</script>

