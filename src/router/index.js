// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'


import Vue from 'vue'

// 引入路由信息（单独模块
import routes from '@/router/routes'

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


export default new VueRouter({
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