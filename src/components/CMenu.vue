<template>
  <el-menu :default-active="routePath" :unique-opened="true" router class="xc-shadow xc5">
    <el-menu-item index="/">
      <i class="ii i-shouye"></i>
      <span>首页</span>
    </el-menu-item>
    <!-- <el-submenu index="审批管理">
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
    </el-submenu> -->
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
        <el-menu-item index="/project/lunbotu">
          <i class="el-icon-arrow-right"></i>
          <span>APP轮播图配置</span>
        </el-menu-item>
        <el-menu-item index="/project/gold-record">
          <i class="el-icon-arrow-right"></i>
          <span>用户金币记录</span>
        </el-menu-item>
        <el-menu-item index="/project/goods">
          <i class="el-icon-arrow-right"></i>
          <span>兑换物品管理</span>
        </el-menu-item>
        <el-menu-item index="/project/goods-exchange">
          <i class="el-icon-arrow-right"></i>
          <span>物品兑换记录</span>
        </el-menu-item>
        <el-menu-item index="/project/news">
          <i class="el-icon-arrow-right"></i>
          <span>房产头条</span>
        </el-menu-item>
        <!-- <el-menu-item index="/project/approve">
          <i class="el-icon-arrow-right"></i>
          <span>审核管理</span>
        </el-menu-item> -->

      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="审核管理">
      <template slot="title">
        <i class="ii i-shenpi"></i>
        <span>审核管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/approve/anchang">
          <i class="el-icon-arrow-right"></i>
          <span>案场秘书</span>
        </el-menu-item>
        <el-menu-item index="/approve/shenhe">
          <i class="el-icon-arrow-right"></i>
          <span>审核人</span>
        </el-menu-item>
        <el-menu-item index="/approve/caiwu">
          <i class="el-icon-arrow-right"></i>
          <span>财务结佣</span>
        </el-menu-item>
        <el-menu-item index="/approve/mine">
          <i class="el-icon-arrow-right"></i>
          <span>我的已审单据</span>
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
        <el-menu-item index="/system/role">
          <i class="el-icon-arrow-right"></i>
          <span>角色查询</span>
        </el-menu-item>
        <el-menu-item index="/system/city">
          <i class="el-icon-arrow-right"></i>
          <span>城市配置</span>
        </el-menu-item>
        <el-menu-item index="/system/feedback">
          <i class="el-icon-arrow-right"></i>
          <span>意见反馈</span>
        </el-menu-item>
        <el-menu-item index="/system/gold">
          <i class="el-icon-arrow-right"></i>
          <span>金币规则</span>
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

