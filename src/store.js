import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    // 正式环境，修改测试环境请更改localhostConfig.js，并保证端口为17011
    basePath: "http://123.57.32.164:8080/",
    picBasePath: "http://123.57.32.164:7001/UploadFiles/picture/",
    smallPicBasePath: "http://123.57.32.164:7001/UploadFiles/sPicture/",
    menuList: [],
    devMode: false,
    loginInfo: {},
    dict: {},
    bread1: "首页",
    bread2: "轨迹监控",
    windowHeight: 0,
    temp: null,
    bread:{},
  },
  mutations: {
    login(state, info) {
      if (!info) {
        info = {};
      }
      state.loginInfo = info;
      sessionStorage.setItem("loginInfo", JSON.stringify(info));
    },
    logout(state) {
      let info = {};
      state.loginInfo = info;
      sessionStorage.setItem("loginInfo", JSON.stringify(info));
    },
    changeBasePath(state, path) {
      state.basePath = path;
    },
    setDict(state, dict) {
      state.dict = dict;
      sessionStorage.setItem("dict", JSON.stringify(dict));
    },
    changeBread(state, b) {
      state.bread1 = b.b1;
      state.bread2 = b.b2;
    },
    setDevMode(state) {
      state.devMode = true;
    },
    setMenuList(state, list) {
      state.menuList = list;
    },
    setWindowHeight(state, height) {
      state.windowHeight = height;
    },
    setPicBasePath(state, picBasePath) {
      state.picBasePath = picBasePath;
    },
    setTemp(state, temp) {
      state.temp = temp;
    }
  }
});
