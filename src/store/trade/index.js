import {reqUserAddress,reqOrderInfo} from '@/api'
const state={
    addressInfo:[],
    orderInfo:{}
}
const actions ={
    // 获取用户地址
    async getAddressInfo({commit}){
        let result =  await reqUserAddress()
        if (result.code ==200) {
            commit('GETADDRESSINFO',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 获取订单页
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if (result.code ==200) {
            commit('GETORDERINFO',result.data)
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations={
    GETADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const getters={
    // 解构订单页的商品列表
    detailArrayList(state){
        return state.orderInfo.detailArrayList||[]
    }
    
}

export default{
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}