import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {

  },
  getters: {
    newCount: function (state) {
      return '获取当前值' + state.count
    }
  }
})
import App from './App.vue'
const vm = new Vue({
  el: '#app',
  render: c => c(App),
  store
})