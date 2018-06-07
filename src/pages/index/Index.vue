<template>
  <div>
    <el-button type="primary">确定</el-button>
    <el-button type="info">消息</el-button>
    <el-button type="warning">警告</el-button>
    <el-button type="danger" plain>危险</el-button>
    <button type="button" class="am-btn am-btn-secondary">次色按钮</button>
    <button class="am-btn am-btn-secondary am-btn-xs">按钮 - xs</button>
    <div class="am-btn-group am-btn-group-xs">
      <button type="button" class="am-btn am-btn-primary am-radius" style="width:200px">左手</button>
      <button type="button" class="am-btn am-btn-primary am-radius">左手</button>
      <button type="button" class="am-btn am-btn-primary am-radius">左手</button>
      <button type="button" class="am-btn am-btn-primary am-radius">左手</button>
    </div>
    <span class="am-badge am-radius">1</span>
    <span class="am-badge am-badge-secondary am-round">3</span>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>

