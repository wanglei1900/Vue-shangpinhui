import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 + 全局组件，引入TypeNav
import TypeNav from '@/components/TypeNav'
// 引入全局组件Carousel，为了轮播图复用
import Carousel from '@/components/Carousel'
// 引入全局组件Pagination,分页器复用
import Pagination from '@/components/Pagination'
// 按需引入饿了吗组件
import { Button, MessageBox } from 'element-ui';
// 注册全局组件TypeNav
// Vue.component(【全局组件的名字】，【哪一个组件】)
Vue.component(TypeNav.name, TypeNav)
// 注册全局组件Carousel
Vue.component(Carousel.name, Carousel)
// 注册全局组件Pagination
Vue.component(Pagination.name, Pagination)
// 注册按需引入的饿了吗组件button
Vue.component(Button.name, Button)
// 饿了吗UI注册组件的时候，还有一种写法，挂载原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
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
// 统一引入接口API函数,*为通配符
import * as API from '@/api'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
})

Vue.config.productionTip = false
// 使用VueRouter插件
Vue.use(VueRouter)

// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
  name:'upper'
})


new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this,
      // vue原型身上绑定API接口方法
      Vue.prototype.$API = API
  },
  // 注册路由，底下的写法KV一致省略V【router小写】
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route和$router属性
  // 注册store，组件实例对象身上会多了一个$store属性
  store,
  router
}).$mount('#app')
