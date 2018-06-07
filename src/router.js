// 首页
import Index from "./pages/index/Index"

// 项目管理
import ProjectBuilding from "./pages/project/building/Index"
import ProjectBuildingAdd from "./pages/project/building/Add"

// 系统管理
import SystemBuilding from "./pages/system/Building"



// Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: "/",
      name: "Index",
      component: Index,
      meta: {}
    },
    {
      path: "/system/building",
      name: "SystemBuilding",
      component: SystemBuilding,
      meta: {}
    },
    {
      path: "/project/building",
      name: "ProjectBuilding",
      component: ProjectBuilding,
      meta: {}
    },
    {
      path: "/project/building/add",
      name: "ProjectBuildingAdd",
      component: ProjectBuildingAdd,
      meta: {}
    },

  ]
});
