import {reqGetSearchInfo} from '@/api'
// search模块的小store仓库
const state = {
    searchList:{},
}
const actions = {
    // 获取search模块的数据
    async getSearchList({commit}, params={}){
        // 当前这个reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：实当用户派发action的时候，第二个参数传递过来，至少是一个孔对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
        console.log(result);
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
// 计算属性：在项目当中，为了简化数据而生
// getters可以把我们将来在组件当中需要用的数据简化一下【将来组件在组件获取数据就方便了】
const getters = {
    // 当前参数state,当前仓库中的state，并非大仓库的那个state
    goodsList(state){
        // state.searchList.goodsList如果服务器数据回来，书一个数组
        // 如果网络不给力或没有网络，state.searchList.goodsList应该返回的是undefined
        // 计算新的属性值至少是个新数组
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    },
    total(state){
        return state.searchList.total
    }
}


export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}