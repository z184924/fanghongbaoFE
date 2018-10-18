<template>
  <el-menu :default-active="routePath" :unique-opened="true" router class="xc-shadow xc5">
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
    list() {
      return this.$store.state.menu ? this.$store.state.menu : [];
    },
    menu() {
      let menu = [];
      let setMenu = (menu, pid) => {
        this.list.forEach(o => {
          if (o.parentId === pid) {
            o.children = [];
            setMenu(o.children, o.menuId);
            menu.push(o);
          }
        });
      };
      setMenu(menu, 0);
      return menu;
    }
  },
  methods: {
    checkRole(path) {
      let exist = false;
      this.list.forEach(o => {
        let ap = path.split("/");
        let am = o.menuUrl.split("/");
        if (ap[1] === am[1] && ap[2] === am[2]) {
          exist = true;
        }
      });
      return exist;
    },
    ico(name) {
      if (name.indexOf("首页") >= 0) {
        return "i-shouye";
      }
      if (name.indexOf("项目管理") >= 0) {
        return "i-xiangmu";
      }
      if (name.indexOf("审核管理") >= 0) {
        return "i-shenpi";
      }
      if (name.indexOf("消息管理") >= 0) {
        return "i-xiaoxi";
      }
      if (name.indexOf("系统管理") >= 0) {
        return "i-guanli";
      }
    }
  },
  created() {
    // console.log(this.$store.state.menu);
  }
};
</script>

