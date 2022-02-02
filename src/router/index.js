// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 引入各个路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Vue from 'vue'

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
    // 配置路由
    routes:[
        {    
            path:'/home',
            component:Home,
            meta:{showFooter:true}
        },
        {    
            path:'/login',
            component:Login,
            meta:{showFooter:false}
        },
        {    
            path:'/register',
            component:Register,
            meta:{showFooter:false}
        },
        {    
            name:'sousuo',  //编程式路由使用params传参时必须要要配置name：属性
            path:'/search/:keyword?',    //在占位符后面写上一个?来表明可传可不传
            component:Search,
            meta:{showFooter:true},
        },
        // 重定向，在项目跑起来的时候，访稳/，立马让他定向到首页
        {
            path:'*',
            redirect:'/home'
        }
    ]
})