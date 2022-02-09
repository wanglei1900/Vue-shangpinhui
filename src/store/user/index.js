import {reqCode, reqRegister} from '@/api'

const state = {
    code:''
}
const actions = {
    // 发起请求，获取验证码
    async getCode({commit}, phone){
        // 获取验证码，由后端直接发用户手机上，这里为了省钱仅用于模拟
        let result = await reqCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户注册
    async checkRegister({commit},user){
        let result = await reqRegister(user)
        console.log(result);
        if (result.code ==200) return 'ok'
        else return Promise.reject(new Error('faile'))
        
    }
}
const mutations = {
    GETCODE(state, code){
        state.code = code
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