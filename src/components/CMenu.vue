<template>
  <el-menu :default-active="routePath" :unique-opened="true" router class="xc-shadow xc5">
    <!-- <el-menu-item index="/">
      <i class="ii i-shouye"></i>
      <span>首页</span>
    </el-menu-item> -->
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
    <!-- <el-submenu index="项目管理">
      <template slot="title">
        <i class="ii i-xiangmu"></i>
        <span>项目管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/project/building">
          <i class="el-icon-arrow-right"></i>
          <span>楼盘管理</span>
        </el-menu-item>
        <el-menu-item index="/project/taizhang">
          <i class="el-icon-arrow-right"></i>
          <span>台账</span>
        </el-menu-item>
        <el-menu-item index="/project/xiangmu-chaxun">
          <i class="el-icon-arrow-right"></i>
          <span>项目查询</span>
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

      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="佣金审核管理">
      <template slot="title">
        <i class="ii i-shenpi"></i>
        <span>佣金审核管理</span>
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
    <el-submenu index="服务费审核管理">
      <template slot="title">
        <i class="ii i-shenpi"></i>
        <span>服务费审核管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/approve-sf/anchang">
          <i class="el-icon-arrow-right"></i>
          <span>案场秘书</span>
        </el-menu-item>
        <el-menu-item index="/approve-sf/shenhe">
          <i class="el-icon-arrow-right"></i>
          <span>审核人</span>
        </el-menu-item>
        <el-menu-item index="/approve-sf/caiwu">
          <i class="el-icon-arrow-right"></i>
          <span>财务</span>
        </el-menu-item>
        <el-menu-item index="/approve-sf/mine">
          <i class="el-icon-arrow-right"></i>
          <span>我的已审单据</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="消息管理">
      <template slot="title">
        <i class="ii i-xiaoxi"></i>
        <span>消息管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/system/information/1">
          <i class="el-icon-arrow-right"></i>
          <span>楼盘消息</span>
        </el-menu-item>
        <el-menu-item index="/system/information/3">
          <i class="el-icon-arrow-right"></i>
          <span>系统消息</span>
        </el-menu-item>
        <el-menu-item index="/system/information/4">
          <i class="el-icon-arrow-right"></i>
          <span>活动消息</span>
        </el-menu-item>
        <el-menu-item index="/system/information/2">
          <i class="el-icon-arrow-right"></i>
          <span>收支消息</span>
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
        <el-menu-item index="/system/vip">
          <i class="el-icon-arrow-right"></i>
          <span>用户VIP管理</span>
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
    </el-submenu> -->
    <!-- <div>{{menu}}</div> -->

    <el-submenu :index="o.menuUrl" v-for="(o,i) in menu" :key="i" v-if="o.children.length>0">
      <template slot="title">
        <i class="ii" :class="ico(o.menuName)"></i>
        <span>{{o.menuName}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="oo.menuUrl" v-for="(oo,ii) in o.children" :key="ii">
          <i class="el-icon-arrow-right"></i>
          <span>{{oo.menuName}}</span>
        </el-menu-item>

      </el-menu-item-group>
    </el-submenu>
    <el-menu-item :index="o.menuUrl" v-else>
      <i class="ii" :class="ico(o.menuName)"></i>
      <span>{{o.menuName}}</span>
    </el-menu-item>

  </el-menu>
</template>
<script>
export default {
  watch: {
    $route: {
      handler(v) {
        // 如果当前url没有权限，则返回首页
        if (!this.checkRole(v.path)) {
          this.$router.replace("/");
        }
      },
      immediate: true
    }
  },
  computed: {
    routePath() {
      return this.$route.path;
    },
    menu() {
      let list = this.$store.state.menu;
      let menu = [];
      let setMenu = (menu, pid) => {
        list.forEach(o => {
          if (o.parentId === pid) {
            o.children = [];
            setMenu(o.children, o.menuId);
            menu.push(o);
          }
        })
      }
      setMenu(menu, 0);
      return menu;
    }
  },
  methods: {
    checkRole(path) {
      let exist = false;
      let list = this.$store.state.menu;
      list.forEach(o => {
        if (path === o.menuUrl) {
          exist = true;
        }
      })
      return exist;
    },
    ico(name) {
      if (name.indexOf("首页") >= 0) {
        return "i-shouye"
      }
      if (name.indexOf("项目管理") >= 0) {
        return "i-xiangmu"
      }
      if (name.indexOf("佣金审核管理") >= 0) {
        return "i-shenpi"
      }
      if (name.indexOf("服务费审核管理") >= 0) {
        return "i-shenpi"
      }
      if (name.indexOf("系统管理") >= 0) {
        return "i-guanli"
      }
    }
  },
  created() {
    // console.log(this.$store.state.menu);
  }
}
</script>

