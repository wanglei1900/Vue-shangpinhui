import {reqShopCart, reqDeleteCartById} from '@/api'

const state={
    cartList:[]
}
const actions ={
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqShopCart()
        if(result.code == 200){
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车产品
    async deleteCartListBySkuId({commit}, skuId){
        // 删除，不用返回data，不用三连环
        let result = await reqDeleteCartById(skuId)
        if (result.code ==200) return 'ok' 
        else return new Promise.reject(new Error('faile'))
    }
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const getters={
    cartList(state){
        return state.cartList[0] ||{}
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
