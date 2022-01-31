// home模块的小store仓库
// 引入封装好的axios请求
import {reqCategoryList,reqBannerList} from '@/api'

const state = {
    // state中数据默认初始值别瞎写，服务器返回对象，服务器返回数据、【根据接口返回值初始化的】
    categorylist:[],
    // 存储banner图片的容器
    bannerList:[],
}
const actions = {
    // 通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({commit}){
        // 通过api接口发送axios请求
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
        // console.log(result);
    },
    // 获取首页home的轮播图banner接口函数的图片
    async getBannerList({commit}){
        let result = await reqBannerList()
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    }
}

const mutations = {
    CATEGORYLIST(state, categoryList){
        state.categorylist = categoryList.slice(0,16)
    },
    GETBANNERLIST(state, bannerList){
        state.bannerList = bannerList
    }
}
const getters = {}


export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}