// 首页
import Index from "./pages/index/Index"

// 项目管理
import ProjectBuilding from "./pages/project/building/Index"
import ProjectBuildingAdd from "./pages/project/building/Add"

// 系统管理
import SystemBuilding from "./pages/system/building/Index"
import SystemInsideUser from "./pages/system/inside-user/Index"



// Vue.use(Router);

export default new Router({
  routes: [
    // 首页
    {
      path: "/",
      name: "Index",
      component: Index,
    },
    {
      path: "/system/building",
      name: "SystemBuilding",
      component: SystemBuilding,
    },
    {
      path: "/project/building",
      name: "ProjectBuilding",
      component: ProjectBuilding,
    },
    {
      path: "/project/building/add",
      name: "ProjectBuildingAdd",
      component: ProjectBuildingAdd,
    },
    {
      path: "/system/inside-user",
      name: "SystemInsideUser",
      component: SystemInsideUser,
    },

  ]
});
