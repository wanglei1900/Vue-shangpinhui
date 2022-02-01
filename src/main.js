import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 + 全局组件，引入TypeNav
import TypeNav from '@/components/TypeNav'
// 引入全局组件Carousel，为了轮播图复用
import Carousel from '@/components/Carousel'

// 注册全局组件TypeNav
// Vue.component(【全局组件的名字】，【哪一个组件】)
Vue.component(TypeNav.name,TypeNav)
// 注册全局组件Carousel
Vue.component(Carousel.name,Carousel)

// 引入Vue-Router
import VueRouter from 'vue-router'
// 引入路由器
import router from './router'
// 引入Vuex实例仓库store
import store from './store'
// 引入mockjServer，引入的时候，mockServer.js里的代码自动执行一次
import '@/mock/mockServer'
// 引入swiper 样式
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
// 使用插件
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  // 注册路由，底下的写法KV一致省略V【router小写】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route和$router属性
  // 注册store，组件实例对象身上会多了一个$store属性
  store,
  router:router
}).$mount('#app')
