犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解
KV：K--->URL  V---->相应的组件
配置路由：
     ------路由组件
     -----router--->index.js
                  import Vue  from 'vue';
                  import VueRouter from 'vue-router';
                  //使用插件
                  Vue.use(VueRouter);
                  //对外暴露VueRouter类的实例
                  export default new VueRouter({
                       routes:[
                            {
                                 path:'/home',
                                 component:Home
                            }
                       ]
                  })
    ------main.js   配置项不能瞎写


$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta





<!-- !1.编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误? -->
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

               push|replace原型方法上二次封装一次
<!-- *先把VueRouter原型对象的push方法，保存一份 -->
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

<!-- *重写push|replace -->
<!-- *第一个参数：告诉原来push方法，你往哪里跳转（传递那些参数） -->
<!-- *第二个参数成功的回调 -->
<!-- *第三个参数失败的回调 -->
<!-- *call|apply 相同点，都可以调用函数一次，都可以篡改函数的上下文一次 -->
<!-- *不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法指向，传递数组 -->
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

<!-- !2.Home模块组件拆分 -->
将Home组件的静态组件拆分
        2.1静态页面（样式）
        2.2拆分静态组件
        2.3发请求获取服务器数据进行展示
        2.4开发动态业务

<!-- !3.三级联动组件 -->
由于三级联动，在Home、Search、Detail,把三级联动注册为全局组件
好处：只需要注册一次，就可以在项目任意地方使用

<!-- !4.其余静态组件（搬砖） -->
HTML+CSS+图片


拆分组件：【结构+样式+图片资源】
一共要拆分为七个组件


<!-- !5.POSTMAN测试接口 -->
--刚刚金果果postman工具测试，接口是没有问题的
--如果服务器返回的数据code字段，代表服务器返回数据成功
--整个项目，所有接口的前缀都有/api字样



<!-- !6.axios二次封装 -->
AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$、fetch、axios

为什么需要进行二次封装axios
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前可以处理一些业务、响应拦截器当服务器数据返回以后，可以处理一些事情。

★在项目当中src目录下API文件夹【axios】,一般关于axios二次封装的文件
接口当中：路径都带有/api
baseURL:"/api"

如果axios基础不好，可以参考git|NPM关于axios文档

跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
http://localhost:8080/#/home //前端项目本地服务器
http://39.98.123.211    //后台服务器
JSONP、CROS、代理


<!-- !7.接口统一管理 -->
项目小：完全可以在组件的生命周期函数中发请求
项目大：axios.get('xxx')

<!-- !8.nprogress进度条的使用 -->
start:进度条开始
done：进度条结束
进度条颜色跨域修改的，当然需要修改人家的样式

进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的


<!-- !9.vuex状态管理库 -->
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
state
mutations
actions
getters
modules

Vuex基本使用:
state
mutations
actions
getters

## vuex仓库管理文件
import Vue from "vue"
<!-- !引入vuex -->
import Vuex from 'vuex'
<!-- !使用vuex -->
Vue.use(Vuex)

<!-- !state:仓库存储数据的地方 -->
const state = {           
    count:1
}
<!-- !actions:处理actions，可以书写业务逻辑，也可以处理异步操作 -->
const actions = {
    <!-- 这里可以书写业务逻辑,但是不能修改state -->
    add(context, value){
        <!-- console.log('actions中的add被调用', context ,value); -->
        context.commit('ADD', value)
    }
}
<!-- !mutations:修改state的唯一手段 -->
const mutations = {
    ADD(state,value){
        <!-- console.log('mutations中的ADD被调用', state, value); -->
        state.count ++
    }
}
<!-- !getters:理解为计算属性，可以简化仓局数据，让组件获取仓库的数据更加方便 -->
const getters = {}

<!-- !创建并暴露vuex实例store -->
export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters
})
##
## 入口文件引入并注册Vuex实例
import Vue from 'vue'
import App from './App.vue'
<!-- 三级联动组件 + 全局组件，引入TypeNav -->
import TypeNav from '@/pages/Home/TypeNav'
<!-- 注册全局组件TypeNav -->
<!-- Vue.component(【全局组件的名字】，【哪一个组件】) -->
Vue.component(TypeNav.name,TypeNav)
<!-- 引入Vue-Router -->
import VueRouter from 'vue-router'
<!-- 引入路由器 -->
import router from './router'
<!-- !引入Vuex实例仓库store -->
import store from './store'
<!-- 测试 -->
import {reqCategoryList} from '@/api/index'
reqCategoryList();


Vue.config.productionTip = false
<!-- 使用插件 -->
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  <!-- 注册路由，底下的写法KV一致省略V【router小写】 -->
  <!-- 注册路由信息：当这里书写router的时候，组件身上都拥有 $route和$router属性 -->
  <!-- !注册store，组件实例对象身上会多了一个$store属性 -->
  store,
  router:router
}).$mount('#app')
##
## 组件中映射state并派发
<!-- !引入mapstate -->
import {mapState} from 'vuex'

export default {
  name:'',
  components:{ListContainer, Recommend, Rank, Like, Floor, Brand},
  computed:{
    <!-- !映射仓库store数据到home组件 -->
    ...mapState(['count'])
  },
  methods: {
    add(){
      <!-- !派发actions -->
      this.$store.dispatch('add')
    }
  },
}
##

Vuex实现模块式开发
如果项目过大，组件过大，接口也很多，数据也很多，可以让Vuex实现模块开发
模拟state存储数据
{
    home:{},
    search:{}
}

## Vuex模块式开发
<!-- !home模块的小store仓库 -->
const state = {a:1}
const actions = {}
const mutations = {}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}
<!-- !search模块的小store仓库 -->
const state = {b:2}
const actions = {}
const mutations = {}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}


<!-- vuex仓库管理文件 -->
import Vue from "vue"
<!-- 引入vuex -->
import Vuex from 'vuex'
<!-- 使用vuex -->
Vue.use(Vuex)
<!-- !引入小store仓库 home 和search -->
import home from "./home"
import search from "./search"

<!-- 创建并暴露vuex实例store -->
export default new Vuex.Store({
    <!-- !实现vuex仓库模块式开发的存储数据 -->
    modules:{
        home,
        search
    }
})

     
   


















