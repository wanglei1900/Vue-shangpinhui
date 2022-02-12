import { reqGoodsInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid---》生成一个随机字符串（不能在变了）
import {getUUID} from "@/utils/uuid_token"

const state = {
    goodsInfo:{},
    // 游客的临时身份
    uuid_token:getUUID()
}
const actions ={
    // 获取产品信息的actions
    async getGoodsInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的结果
        // 加入购物车以后（发请求），前台将参数发送给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表本次操作成功
        // 因为服务器没有返回其余数据，我们不需要vuex三连环
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前的这个函数如果执行返回的是个promise
        // code：200代表服务器加入购物车成功
        if(result.code == 200) return 'ok'      //返回非promise值ok，promise仍然返回一个promise
        else return Promise.reject(new Error('faile')) // 代表加入购物车失败，promise失败的回调，promise终止
    }
}
const mutations ={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
// 简化数据
const getters ={
    // 路径导航简化的数据
    categoryView(state){
        // 比如：state.goodIfno初始状态空对象，空对象的categoryView属性值undefined
        // 当前计算出的属性值categoryView至少是个空对象，假的报错不会有
        return state.goodsInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state){
        return state.goodsInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList||[]
    }
}

export default { 
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}
