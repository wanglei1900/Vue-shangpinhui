import {reqShopCart, reqDeleteCartById, reqCheckStatus} from '@/api'

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
        else return Promise.reject(new Error('faile'))
    },
    // 改变商品状态
    async changeCheckStatus({commit},{skuId,isChecked}){
        let result = await reqCheckStatus(skuId,isChecked)
        if (result.code ==200) return 'ok'
        else return Promise.reject(new Error('FAILE'))
    },
    deleteAllCheckedCart({dispatch,getters}){
        // context：小仓库，commit【提交mutationa修改state】
        // 获取购物车车中全部的产品（是一个数组）
        let PromiseAll = []
        getters.cartList.cartInfoList.filter((element)=>element.isChecked ==1).forEach(element => {
            let promise = dispatch('deleteCartListBySkuId', element.skuId)
            PromiseAll.push(promise)
        });
        
        // 只要全部的p1|p2... 都成功,返回结果即为成功
        // 如果有一个失败，返回即为失败结果
        return Promise.all(PromiseAll)
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
