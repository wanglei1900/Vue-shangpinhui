import {reqCode, reqRegister,reqUserLogin,reqUserInfo,reQuitRegister} from '@/api'
import {setToken,getToken,removeToken} from "@/utils/token"

const state = {
    // 验证码
    code:'',
    // 给用户返回的token,（封装 utils/token.js）
    token:getToken(),
    // 用户信息
    userInfo:{}
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
        
    },
    // 用户登录(token)
    async userLogin({commit},params){
       let result = await reqUserLogin(params)
        // 服务器下发token，用户唯一标识符（uuid）
        // 将来通过带token找服务器要用户信息进行展示
       if (result.code==200) {
            // 用户已经登录成功且获取到token
           commit('USERLOGIN', result.data.token)
            // 持久化存储token（封装 utils/token.js）
            setToken(result.data.token)
            return 'ok'
       }else{
           return Promise.reject(new Error('falie'))
       }
    },
    // 获取用户信息（token）
    async userInfo({commit}){
        let result = await reqUserInfo()
        if (result.code ==200) {
            commit('USERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async quitRegister({commit}){
        // 向服务器发送请求，清楚token
        let result = await reQuitRegister()
        if (result.code ==200){
            commit('QUITRESISTER')
            return 'ok'
        }
        else return Promise.reject(new Error('faile'))
    }
}
const mutations = {
    GETCODE(state, code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    QUITRESISTER(state){
        // 帮仓库中相关用户信息清空
        state.token = ''
        state.userInfo =''
        // 本地存储token 信息清空
        removeToken()
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