import Vue from "vue";
import Element from "element-ui"
import $ from "jquery"
import "./assets/css/animate.css"
import Router from "vue-router";
import Vuex from "vuex";
import Ve from "velocity-animate"
import moment from "moment"
import clone from "clone"


Vue.use(Element, {
  size: "mini"
});
Vue.use(Vuex);
Vue.use(Router);
window.Router = Router;
window.Vuex = Vuex;
window.Vue = Vue;
window.$ = $;
window.Ve = Ve;
window.moment = moment;
window.clone = clone;
// 
