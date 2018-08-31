/****************************************** */

import Vue from "vue";
import Element from "element-ui"
// import $ from "jquery"
// import "./assets/css/animate.css"
// import Router from "vue-router";
// import Vuex from "vuex";
// import Ve from "velocity-animate"
import moment from "moment"
import clone from "clone"
import kindOf from "kind-of"




/************************************************* */

import App from "./App"
import store from "./store"
import router from "./router.js"
import mx from "./mx"

// import "./assets/css/amaze-ui/css/amazeui.css"
import "./assets/css/element/index.css"
import "./assets/css/base.scss"

window.ueContentCallback = cb => {
  window.addEventListener('message', res => {
    cb(res)
  })
}



Vue.use(Element, {
  size: "mini"
});
// Vue.use(Vuex);
// Vue.use(Router);
// window.Router = Router;
// window.Vuex = Vuex;
// window.Vue = Vue;
// window.$ = $;
// window.Ve = Ve;
window.moment = moment;
window.clone = clone;
window.kindOf = kindOf;

Vue.directive('drag', {
  bind(el) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    dialogHeaderEl.onmousedown = (e) => {
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;
      let styL, styT;
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        if (sty.left != "auto") {
          styL = +sty.left.replace(/\px/g, '');
        } else {
          styL = 0;
        }
        if (sty.top != "auto") {
          styT = +sty.top.replace(/\px/g, '');
        } else {
          styT = 0;
        }
      };
      document.onmousemove = function (e) {
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})
Vue.prototype.$ELEMENT = {
  size: 'small'
};

Vue.directive("focus", {
  inserted: function (el) {
    el.focus();
  }
});
Vue.mixin(mx);
new Vue({
  el: "#app",
  store,
  router,
  template: "<app></app>",
  components: {
    App
  }
});
