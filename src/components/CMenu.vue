<template>
  <el-menu :default-active="routePath" @open="handleOpen" @close="handleClose" :unique-opened="true" router class="xc-shadow">
    <el-menu-item index="/">
      <i class="ii i-shouye"></i>
      <span>首页</span>
    </el-menu-item>
    <el-submenu index="审批管理">
      <template slot="title">
        <i class="ii i-shenpi"></i>
        <span>审批管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="佣金审批">
          <i class="el-icon-arrow-right"></i>
          <span>佣金审批</span>
        </el-menu-item>
        <el-menu-item index="服务费审批">
          <i class="el-icon-arrow-right"></i>
          <span>服务费审批</span>
        </el-menu-item>
        <el-menu-item index="审批消息提醒">
          <i class="el-icon-arrow-right"></i>
          <span>审批消息提醒</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="项目管理">
      <template slot="title">
        <i class="ii i-xiangmu"></i>
        <span>项目管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/project/building">
          <i class="el-icon-arrow-right"></i>
          <span>楼盘管理</span>
        </el-menu-item>
        <el-menu-item index="APP轮播图配置">
          <i class="el-icon-arrow-right"></i>
          <span>APP轮播图配置</span>
        </el-menu-item>
        <el-menu-item index="房产头条">
          <i class="el-icon-arrow-right"></i>
          <span>房产头条</span>
        </el-menu-item>
        <el-menu-item index="兑换物品管理">
          <i class="el-icon-arrow-right"></i>
          <span>兑换物品管理</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="系统管理">
      <template slot="title">
        <i class="ii i-guanli"></i>
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/system/inside-user">
          <i class="el-icon-arrow-right"></i>
          <span>内部人员管理</span>
        </el-menu-item>
        <el-menu-item index="客户信息映射配置">
          <i class="el-icon-arrow-right"></i>
          <span>客户信息映射配置</span>
        </el-menu-item>
        <el-menu-item index="楼盘状态配置">
          <i class="el-icon-arrow-right"></i>
          <span>楼盘配置</span>
        </el-menu-item>
        <el-menu-item index="城市配置">
          <i class="el-icon-arrow-right"></i>
          <span>城市配置</span>
        </el-menu-item>
        <el-menu-item index="系统消息推送">
          <i class="el-icon-arrow-right"></i>
          <span>系统消息推送</span>
        </el-menu-item>
        <el-menu-item index="意见反馈">
          <i class="el-icon-arrow-right"></i>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>
<script>
export default {
  computed: {
    routePath() {
      return this.$route.path;
    }
  }
}
</script>

