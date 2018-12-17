import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);



// 首页
import Index from "./pages/index/Index"

// 项目管理
import ProjectBuilding from "./pages/project/building/Index"
import ProjectBuildingEdit from "./pages/project/building/Edit"

import ProjectLunbotu from "./pages/project/lunbotu/Index"

import ProjectGoldRecord from "./pages/project/gold-record/Index"

import ProjectGoods from "./pages/project/goods/Index"

import ProjectGoodsExchange from "./pages/project/goods-exchange/Index"

import ProjectNews from "./pages/project/news/Index"

import ProjectApprove from "./pages/project/approve/Index"

import ProjectTaizhang from "./pages/project/taizhang/Index"

import ProjectXiangmuChaxun from "./pages/project/xiangmu-chaxun/Index"

import ProjectCustomer from "./pages/project/customer/Index"

// 系统管理
import SystemInsideUser from "./pages/system/inside-user/Index"

import SystemVip from "./pages/system/vip/Index"

import SystemCity from "./pages/system/city/Index"

import SystemRole from "./pages/system/role/Index"

import SystemFeedback from "./pages/system/feedback/Index"

import SystemGold from "./pages/system/gold/Index"

import SystemInformation from "./pages/system/information/Index"

import SystemStat from "./pages/system/stat/Index"

// 审核管理
import SystemApproveAnchang from "./pages/approve/anchang/Index"

import SystemApproveShenhe from "./pages/approve/shenhe/Index"

import SystemApproveCaiwu from "./pages/approve/caiwu/Index"

import SystemApproveMine from "./pages/approve/mine/Index"


// 审核（服务费）管理
import SystemApproveSfAnchang from "./pages/approve-sf/anchang/Index"

import SystemApproveSfShenhe from "./pages/approve-sf/shenhe/Index"

import SystemApproveSfCaiwu from "./pages/approve-sf/caiwu/Index"

import SystemApproveSfMine from "./pages/approve-sf/mine/Index"




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
      path: "/project/building/edit/:type/:id", //add/edit
      name: "ProjectBuildingEdit",
      component: ProjectBuildingEdit,
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
      path: "/project/taizhang",
      name: "ProjectTaizhang",
      component: ProjectTaizhang,
    },
    {
      path: "/project/xiangmu-chaxun",
      name: "ProjectXiangmuChaxun",
      component: ProjectXiangmuChaxun,
    },
    {
      path: "/project/customer",
      name: "ProjectCustomer",
      component: ProjectCustomer,
    },




    // 系统
    {
      path: "/system/inside-user",
      name: "SystemInsideUser",
      component: SystemInsideUser,
    },
    {
      path: "/system/vip",
      name: "SystemVip",
      component: SystemVip,
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
    {
      path: "/system/information/:type",
      name: "SystemInformation",
      component: SystemInformation,
    },
    {
      path: "/system/stat",
      name: "SystemStat",
      component: SystemStat,
    },


    // 审核
    {
      path: "/approve/anchang",
      name: "SystemApproveAnchang",
      component: SystemApproveAnchang,
    },
    {
      path: "/approve/shenhe",
      name: "SystemApproveShenhe",
      component: SystemApproveShenhe,
    },
    {
      path: "/approve/caiwu",
      name: "SystemApproveCaiwu",
      component: SystemApproveCaiwu,
    },
    {
      path: "/approve/mine",
      name: "SystemApproveMine",
      component: SystemApproveMine,
    },

    // 审核（服务费）
    {
      path: "/approve-sf/anchang",
      name: "SystemApproveSfAnchang",
      component: SystemApproveSfAnchang,
    },
    {
      path: "/approve-sf/shenhe",
      name: "SystemApproveSfShenhe",
      component: SystemApproveSfShenhe,
    },
    {
      path: "/approve-sf/caiwu",
      name: "SystemApproveSfCaiwu",
      component: SystemApproveSfCaiwu,
    },
    {
      path: "/approve-sf/mine",
      name: "SystemApproveSfMine",
      component: SystemApproveSfMine,
    },

  ]
});
