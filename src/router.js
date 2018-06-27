import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);



// 首页
import Index from "./pages/index/Index"

// 项目管理
import ProjectBuilding from "./pages/project/building/Index"
import ProjectBuildingAddOrEdit from "./pages/project/building/AddOrEdit"

import ProjectLunbotu from "./pages/project/lunbotu/Index"

// 系统管理
import SystemBuilding from "./pages/system/building/Index"

import SystemInsideUser from "./pages/system/inside-user/Index"

import SystemCity from "./pages/system/city/Index"

import SystemRole from "./pages/system/role/Index"

import SystemFeedback from "./pages/system/feedback/Index"

import SystemGold from "./pages/system/gold/Index"


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
      meta: {
        // keepAlive: true
      }
    },
    {
      path: "/project/building/add-or-edit/:type", //add/edit
      name: "ProjectBuildingAddOrEdit",
      component: ProjectBuildingAddOrEdit,
    },
    {
      path: "/project/lunbotu",
      name: "ProjectLunbotu",
      component: ProjectLunbotu,
    },





    {
      path: "/system/inside-user",
      name: "SystemInsideUser",
      component: SystemInsideUser,
    },
    {
      path: "/system/city",
      name: "SystemCity",
      component: SystemCity,
    },
    {
      path: "/system/role",
      name: "SystemRole",
      component: SystemRole,
    },
    {
      path: "/system/feedback",
      name: "SystemFeedback",
      component: SystemFeedback,
    },
    {
      path: "/system/gold",
      name: "SystemGold",
      component: SystemGold,
    },

  ]
});
