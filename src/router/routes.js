// 引入一级路由组件
// 引入二级路由组件
// 路由懒加载无需额外引入路由组件
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
// const Foo = () => import('./Foo.vue')

// 路由配置的信息
export default [
    {   
        name:'home',
        path:'/home',
        component:()=>import('@/pages/Home'),
        meta:{showFooter:true}
    },
    {   
        name:'login', 
        path:'/login',
        component:()=>import('@/pages/Login'),
        meta:{showFooter:false}
    },
    {    
        path:'/register',
        component:()=>import('@/pages/Register'),
        meta:{showFooter:false}
    },
    {    
        name:'sousuo',  //编程式路由使用params传参时必须要要配置name：属性
        path:'/search/:keyword?',    //在占位符后面写上一个?来表明可传可不传
        component:()=>import('@/pages/Search'),
        meta:{showFooter:true},
    },
    {
        path:'/detail/:skuid',
        component:()=>import('@/pages/Detail'),
        meta:{showFooter:true}
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{showFooter:true}
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:()=>import('@/pages/ShopCart'),
        meta:{showFooter:true}
    },
    {   
        name:'trade',
        path:'/trade',
        component:()=>import('@/pages/Trade'),
        meta:{showFooter:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须从购物车而来
            if (from.path=='/shopcart') {
                next()
            }else{
                // 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址
                next(false)
            }
        }
    },
    {   
        name:'pay',
        path:'/pay',
        component:()=>import('@/pages/Pay'),
        meta:{showFooter:true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path =='/trade') {
                next()
            }else{
                next(false)
            }
        }
    },
    {   
        name:'paysuccess',
        path:'/paysuccess',
        component:()=>import('@/pages/PaySuccess'),
        meta:{showFooter:true}
    },
    {   
        name:'center',
        path:'/center',
        component:()=>import('@/pages/Center'),
        meta:{showFooter:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',     //二级路由不能加路径/
                component:()=>import('@/pages/Center/MyOrder'),
            },
            {
                path:'grouporder',     //二级路由不能加路径/
                component:()=>import('@/pages/Center/GroupOrder'),
            },
            {
                path:'/center',      //重定向的时候需要加路径/
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:'/communication',
        component:()=>import('@/pages/Communication/Communication'),
        children:[
            {
                path:'event',
                component:()=>import('@/pages/Communication/EventTest/EventTest'),
                meta:{showFooter:false}
            },
            {
                path:'model',
                component:()=>import('@/pages/Communication/ModelTest/ModelTest'),
                meta:{showFooter:false}
            },
            {
                path:'sync',
                component:()=>import('@/pages/Communication/SyncTest/SyncTest'),
                meta:{showFooter:false}
            },
            {
                path:'attrs-listeners',
                component:()=>import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
                meta:{showFooter:false}
            },
            {
                path:'children-parent',
                component:()=>import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
                meta:{showFooter:false}
            },
            {
                path:'scope-slot',
                component:()=>import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
                meta:{showFooter:false}
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访稳/，立马让他定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]