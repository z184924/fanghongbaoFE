import App from "./App"
import store from "./store"
import router from "./router.js"
import mx from "./mx"

import "./assets/css/element/index.css"
import "./assets/css/base.scss"
import "./assets/css/page.scss"

Vue.directive('dialog-drag', {
  bind(el, binding, vnode, oldVnode) {
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
