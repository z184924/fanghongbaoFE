<template>
  <div class="xc1">
    <div class="xc1--title">
      <i class="ii i-red-packet" style="color:#e33;font-size:30px;padding-right:20px;"></i>
      <span>房红包后台管理</span>
    </div>
    <div class="xc1--center"></div>
    <div class="xc1--control">
      <i class="ii i-xiaoxi"></i>
      <span style="padding:0 3px;">消息</span>
      <span class="am-badge am-badge-danger am-round">3</span>
    </div>
    <div class="xc1--control">
      <i class="ii i-tixing"></i>
      <span style="padding:0 3px;">提醒</span>
      <span class="am-badge am-badge-primary am-round">5</span>
    </div>
    <div class="xc1--control" @click="fullScreen">
      <i class="ii i-quanping"></i>
      <span style="padding:0 3px;">全屏</span>
    </div>
    <div class="xc1--control" style="color:#a00">
      <i class="ii i-zhuxiao"></i>
      <span style="padding:0 3px;">注销</span>
    </div>
    <div class="xc1--control -text">
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
      }
      else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen();
      }
      else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
      }
      else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
      }
      this.$message({
        type: "success",
        message: "按下 ESC 键即可退出全屏模式"
      });
    }
  }
}
</script>

