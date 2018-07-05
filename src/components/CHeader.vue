<template>
  <div class="xc1 xc-shadow">
    <div class="xc1__title">
      <!-- <i class="ii i-red-packet" style="color:#e33;font-size:30px;padding-right:20px;"></i> -->
      <img src="@/assets/img/logo.png" alt="" class="xc1__logo">
      <span>房红包后台管理系统</span>
    </div>
    <div class="xc1__center"></div>
    <div class="xc1__control" title="消息" @click="mxDevAlert">
      <el-badge :value="63" :max="99" class="">
        <i class="ii i-xiaoxi"></i>
        <span style="padding:0 3px;">消息</span>
      </el-badge>
    </div>
    <div class="xc1__control" title="提醒" @click="mxDevAlert">
      <el-badge :value="5" :max="99" class="">
        <i class="ii i-tixing"></i>
        <span style="padding:0 3px;">提醒</span>
      </el-badge>
    </div>
    <div class="xc1__control" @click="fullScreen">
      <i class="ii i-quanping"></i>
      <span style="padding:0 3px;">全屏</span>
    </div>
    <div class="xc1__control" style="color:#a00" @click="mxLogout">
      <i class="ii i-zhuxiao"></i>
      <span style="padding:0 3px;">注销</span>
    </div>
    <div class="xc1__control -text">
      <i class="ii i-yonghu"></i>
      <span style="padding:0 3px;">管理员</span>
    </div>
  </div>
</template>
<script>
export default {
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
    }
  }
};
</script>

