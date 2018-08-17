
<template>
  <div>
    <transition @enter="veEnter" @leave="veLeave" @before-enter="veBeforeEnter" @after-enter="veAfterEnter">
      <app-login v-if="!mxLoginInfo.username"></app-login>
      <div class="stage" v-else>
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
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
              </keep-alive>
              <router-view v-if="!$route.meta.keepAlive"></router-view>
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
    </transition>
  </div>
</template>

<script>
// import dict from "./dict.js"
import localhostConfig from "../localhostConfig.js"
import AppLogin from "./AppLogin"
import CHeader from "@/components/CHeader"
import CMenu from "@/components/CMenu"
import Ve from "velocity-animate"

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
  methods: {
    veBeforeEnter(el, done) {
      el.style.opacity = 0;
      el.style.top = "-30px";
      el.style.position = "fixed";
      el.style.height = "90vh";
    },
    veEnter(el, done) {
      Velocity(el, { opacity: 1, top: "0px", height: "100vh" }, { duration: 800, easing: "easeOutQuint", complete: done })
    },
    veAfterEnter(el, done) {
      el.style.position = "unset";
    },
    veLeave(el, done) {
      Velocity(el, { opacity: 0, top: "-30px" }, { duration: 0, complete: done })
    },
  },
  created() {
    if (window.location.port == "17011") {
      this.$store.commit("setDevMode");
      this.$store.commit("changeBasePath", localhostConfig.basePath);
    }
    window.onresize = () => {
      this.$store.commit("setWindowHeight", window.innerHeight);
    }

    this.$store.commit("setWindowHeight", window.innerHeight);
    this.$store.commit("clearDict");
    this.$store.commit("setDict", JSON.parse(sessionStorage.getItem("dict")));
    let loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
    this.$store.commit("login", JSON.parse(sessionStorage.getItem("loginInfo")));
  },

}
</script>
<style lang="scss">
.stage {
  width: 100vw;
  height: 100vh;
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
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  &--center-gap {
    flex: 8px 0 0;
  }
  &--footer {
    font-size: 14px;
    position: relative;
    display: flex;
    flex: 30px 0 0;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: rgb(185, 177, 177);
  }
}
</style>