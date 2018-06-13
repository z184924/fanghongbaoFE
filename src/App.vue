
<template>
  <div>
    <!-- <app-login v-if="mxLoginInfo.username==''"></app-login> -->
    <div class="stage">
      <div class="stage--header">
        <c-header></c-header>
      </div>
      <div class="stage--center-gap"></div>
      <div class="stage--center-gap"></div>
      <div class="stage--center">
        <div class="stage--center-gap"></div>
        <div class="stage--center-gap"></div>
        <div class="stage--menu">
          <c-menu></c-menu>
        </div>
        <div class="stage--center-gap"></div>
        <div class="stage--page">
          <div class="stage--page-in">
            <!-- <transition name="fade"> -->
            <router-view></router-view>
            <div style="height:130px"></div>
            <!-- </transition> -->
          </div>
        </div>
      </div>
      <div class="stage--footer">
        <b>房红包后台管理系统</b>
        <span>&nbsp;&nbsp;</span>
        <span> Copyright © </span>
        <span>&nbsp;房红包（北京）网络科技有限公司</span>
      </div>
    </div>
  </div>
</template>

<script>
import dict from "./dict.js"
import localhostConfig from "../localhostConfig.js"
import AppLogin from "./AppLogin"
import CHeader from "@/components/CHeader"
import CMenu from "@/components/CMenu"

export default {
  components: {
    AppLogin,
    CHeader,
    CMenu
  },
  data() {
    return {
      // userType: 0, //0等待 1登录 2业主 3供应商
      // bread: { b1: "", b2: "" }

    };
  },
  created() {
    if (window.location.port == "17011") {
      this.$store.commit("setDevMode");
      this.$store.commit("setPicBasePath", "http://192.168.0.201:60041/")
      this.$store.commit("changeBasePath", localhostConfig.basePath);
    }
    this.$store.commit("setWindowHeight", window.innerHeight);
    window.onresize = () => {
      this.$store.commit("setWindowHeight", window.innerHeight);
    }
    let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));

    this.$store.commit("setDict", dict);
  },

  methods: {
  }
}
</script>
<style lang="scss">
.stage {
  width: 100vw;
  height: 100vh !important;
  display: flex;
  flex-flow: column;
  &--header {
    flex: 70px 0 0;
  }
  &--center {
    flex: 100% 1 1;
    display: flex;
    position: relative;
  }
  &--menu {
    flex: 260px 0 0;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  &--page {
    flex: 100% 1 1;
    position: relative;
  }
  &--page-in {
    position: absolute;
    left: 0;
    top: 0;
    width:100%;
    height:100%;
    overflow-y: scroll;
  }
  &--center-gap {
    flex: 8px 0 0;
  }
  &--footer {
    font-size:14px;
    position: relative;
    z-index: 10000;
    display: flex;
    flex: 30px 0 0;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: rgb(170, 170, 170);
  }
}
</style>