// 引入一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
// 路由配置的信息
export default [
    {   
        name:'home',
        path:'/home',
        component:Home,
        meta:{showFooter:true}
    },
    {   
        name:'login', 
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
    {
        path:'/detail/:skuid',
        component:Detail,
        meta:{showFooter:true}
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        meta:{showFooter:true},
        component:AddCartSuccess
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{showFooter:true}
    },
    {   
        name:'trade',
        path:'/trade',
        component:Trade,
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
        component:Pay,
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
        component:PaySuccess,
        meta:{showFooter:true}
    },
    {   
        name:'center',
        path:'/center',
        component:Center,
        meta:{showFooter:true},
        // 二级路由组件
        children:[
            {
                path:'myorder',     //二级路由不能加路径/
                component:MyOrder
            },
            {
                path:'grouporder',     //二级路由不能加路径/
                component:GroupOrder
            },
            {
                path:'/center',      //重定向的时候需要加路径/
                redirect:'/center/myorder'
            }
        ]
    },
    // 重定向，在项目跑起来的时候，访稳/，立马让他定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]