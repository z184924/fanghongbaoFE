// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    basePath: "http://111.30.79.43:60033/",
    picBasePath: "http://111.30.79.43:60041/",
    menuList: [],
    devMode: false,
    loginInfo: {},
    dict: {},
    bread1: "首页",
    bread2: "轨迹监控",
    windowHeight: 0,
  },
  mutations: {
    login(state, info) {
      state.loginInfo = info;
      sessionStorage.setItem("loginInfo", JSON.stringify(info));
    },
    logout(state) {
      let info = {
        username: "",
        nickname: "",
        type: 1,
        token: "",
      };
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
    }
  }
});
