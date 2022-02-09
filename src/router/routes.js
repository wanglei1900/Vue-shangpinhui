// 引入各个路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 路由配置的信息
export default [
    {    
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
    // 重定向，在项目跑起来的时候，访稳/，立马让他定向到首页
    {
        path:'*',
        redirect:'/home'
    }
]