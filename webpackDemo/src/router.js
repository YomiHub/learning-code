import vueRouter from 'vue-router'
import pageone from './view/firstpage.vue'
import pagetwo from './view/secondpage.vue'
import childrenone from './view/childrenone.vue'
import childrentwo from './view/childrentwo.vue'

var router = new vueRouter({
  routes: [
    {
      path: '/pageone',
      component: pageone,
      children: [
        { path: 'childrenone', component: childrenone },
        { path: 'childrentwo', component: childrentwo }
      ]
    },
    { path: '/pagetwo', component: pagetwo }
  ]
})

export default router