// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Vuex from 'vuex';
import $ from 'jquery';

Vue.use(Vuex);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//引入省、市、区三级联动
import {pca, pcaa} from 'area-data';
import 'vue-area-linkage/dist/index.css';
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(VueAreaLinkage);

import '@/common/js/validate.js'

Vue.config.productionTip = false;
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
  },
  mutations: {
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
