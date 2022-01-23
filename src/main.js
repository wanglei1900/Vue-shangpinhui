import Vue from 'vue'
import App from './App.vue'
// 三级联动组件---全局组件
import TypeNav from '@/pages/Home/TypeNav'
// 第一个参数：全局组件的名字  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)

// 引入Vue-Router
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'


Vue.config.productionTip = false
// 使用插件
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  // 注册路由，底下的写法KV一致省略V【router小写】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route和$router属性
  router:router
}).$mount('#app')
