// vuex仓库管理文件

import Vue from "vue"
// 引入vuex
import Vuex from 'vuex'
// 使用vuex
Vue.use(Vuex)
// 引入小store仓库 home 和search
import home from "./home"
import search from "./search"

// 创建并暴露vuex实例store
export default new Vuex.Store({
    // 实现vuex仓库模块式开发的存储数据
    modules:{
        home,
        search
    }
})
