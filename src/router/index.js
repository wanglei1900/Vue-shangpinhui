// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'
import Vue from 'vue'
// 引入路由信息（单独模块
import routes from '@/router/routes'
// 引入token管理文件
import {removeToken} from '@/utils/token'

// 引入store
import store from '@/store'

// 先把VueRouter原型对象的push方法，保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递那些参数）
// 第二个参数成功的回调
// 第三个参数失败的回调
// call|apply 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点，call与apply传递参数：call传递参数用逗号隔开，apply方法指向，传递数组
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

let router = new VueRouter({
    mode:'hash',
    // 配置路由,kv一致省略v
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        // 返回到y=0,滚动条在最上方
        return { y: 0 }
    }
})
// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
    // to and from are both route objects. must call `next`.
    // to:要跳转到哪个路由的信息
    // from:从哪个路由来的信息
    // next:放行函数   next()放行   next('path')放行到指定路由         next(false)路由中断驳回
    
    // 为了测试全部放行
    next()
    // 用户登录了才会有token，未登录或者退出登录都没有token
    let token = store.state.userStore.token
    // 用户信息
    let name  = store.state.userStore.userInfo.name
    // 已经登录
    if(token){
        if (to.path=='/login') {
            // 用户已经登录了还想去login，不能去,停留在首页
            next('/home')
        }else{
            // 登录，去的不是login
            // 如果用户名已有不拦
            if (name) {
                next()
            }else{
                // 没有用户信息，派发actions，让仓库存储用户信息在跳转
                try {
                    // 获取用户信息成功放行
                    await store.dispatch('userStore/userInfo')
                    next()
                } catch (error) {
                    // token失效了
                    // 清除token失效token
                    await store.dispatch('userStore/quitRegister')
                    // 跳转登录界面，让用户重新登录.  ******这里应该是跳转登录界面而不是放行登录界面
                    next('/login')
                }
            }
        }
    }else{
        // 未登录暂时没有处理完毕，先这个样子，后期在处理
        next()
    }
})


export default router