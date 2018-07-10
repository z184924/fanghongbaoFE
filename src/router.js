import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);



// 首页
import Index from "./pages/index/Index"

// 项目管理
import ProjectBuilding from "./pages/project/building/Index"
import ProjectBuildingAddOrEdit from "./pages/project/building/AddOrEdit"

import ProjectLunbotu from "./pages/project/lunbotu/Index"

import ProjectGoldRecord from "./pages/project/gold-record/Index"

import ProjectGoods from "./pages/project/goods/Index"

import ProjectGoodsExchange from "./pages/project/goods-exchange/Index"

import ProjectNews from "./pages/project/news/Index"

import ProjectApprove from "./pages/project/approve/Index"

// 系统管理
import SystemInsideUser from "./pages/system/inside-user/Index"

import SystemCity from "./pages/system/city/Index"

import SystemRole from "./pages/system/role/Index"

import SystemFeedback from "./pages/system/feedback/Index"

import SystemGold from "./pages/system/gold/Index"

// 审核管理
import SystemApproveAnchang from "./pages/approve/anchang/Index"



export default new Router({
  routes: [
    // 首页
    {
      path: "/",
      name: "Index",
      component: Index,
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
      path: "/project/building/add-or-edit/:type/:id", //add/edit
      name: "ProjectBuildingAddOrEdit",
      component: ProjectBuildingAddOrEdit,
    },
    {
      path: "/project/lunbotu",
      name: "ProjectLunbotu",
      component: ProjectLunbotu,
    },
    {
      path: "/project/gold-record",
      name: "ProjectGoldRecord",
      component: ProjectGoldRecord,
    },
    {
      path: "/project/goods",
      name: "ProjectGoods",
      component: ProjectGoods,
    },
    {
      path: "/project/goods-exchange",
      name: "ProjectGoodsExchange",
      component: ProjectGoodsExchange,
    },
    {
      path: "/project/news",
      name: "ProjectNews",
      component: ProjectNews,
    },
    {
      path: "/project/approve",
      name: "ProjectApprove",
      component: ProjectApprove,
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


    // 审核
    {
      path: "/approve/anchang",
      name: "SystemApproveAnchang",
      component: SystemApproveAnchang,
    },

  ]
});
