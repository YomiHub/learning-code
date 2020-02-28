/* //js入口文件
import $ from 'jquery'  //es6中导入模块的方式，直接运行浏览器无法解析（使用wenbpack解决）
import './css/index.css'
import './css/index.less'
import './css/index.scss'
import 'bootstrap/dist/css/bootstrap.css'

$(function () {
  $('li:odd').css('backgroundColor', 'blue')
  $('li:even').css('backgroundColor', function () {
    return '#' + 'ccc'
  })
})

class Person {
  static info = { name: "hym", age: 22 }
}

console.log(Person.info) */

// var login = {
//   template: '<h1>登录组件</h1>'
// }
import 'bootstrap/dist/css/bootstrap.css'
import Vue from 'vue'
import vueRouter from 'vue-router'
Vue.use(vueRouter)

// import MintUI from 'mint-ui'
import { Button, Cell } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './css/app.css'
// Vue.use(MintUI)
Vue.component(Button.name, Button)  //Vue.use(Button)

import './lib/mui/css/mui.min.css'

import login from './app.vue'
import testInfo, { title as titlechange, name } from './js/testExport.js'
import router from './router.js'
console.log(testInfo)
console.log(name)
console.log(titlechange)

var vm = new Vue({
  el: '#app',
  data: {
    msg: 'vue实例中的msg'
  },
  // components:{
  //   login
  // }
  render: c => c(login),  //在webpack中如果想要通过Vue将一个组件放到页面中展示，要是用vm实例中的render函数
  router
})

