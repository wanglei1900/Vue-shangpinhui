// vue插件一定暴露一个对象
let myPlugins ={}

myPlugins.install=function(Vue,options){
    // Vue.prototype.$bus:任何组件都可以使用
    // 注册或获取全局指令。
    Vue.directive(options.name,(element,b)=>{
      console.log('b');
    })
}

export default myPlugins