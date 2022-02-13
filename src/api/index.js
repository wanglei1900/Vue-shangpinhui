// 当前的这个模块：API接口进行统一管理
import requests from "./request";
import mockRequest from './mockAjax'
// 三级联动接口
// /api/product/getBaseCategoryList     GET请求，    无参数

// 发请求 axios发请求返回结果是Promise对象
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求，获取三级菜单数据，当前者个函数只需要把服务器返回的结果返回即可
export const reqCategoryList =()=>requests({url:'/product/getBaseCategoryList', method:'GET',})
// 切记：当前函数执行需要把服务器返回结果返回

// 获取轮播图banner(Home首页轮播图的接口)
export const reqBannerList =()=>mockRequest({url:'/banner', method:'GET'})
// 获取floor轮播图的数据
export const reqFloorList = ()=>mockRequest({url:'/floor', method:'GET'})
// 获取搜索模块接口，请求地址：/api/list， 请求方式：POST  参数：需要代参数
// 当前这个接口(获取搜索模块的数据)，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({
    url:'/list',
    method:'POST',
    data:params
})

// 获取产品详细信息，请求地址：/api/item/{ skuId } ， 请求方式：GET  ，请求参数：
export const reqGoodsInfo =(skuid)=>requests({
  url:`/item/${skuid}`,
  method:'GET'
})
// 将产品添加到购物车中（获取更新某一个产品的个数）
// /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({
  url:`/cart/addToCart/${skuId}/${skuNum}`,
  method:'POST'
})

// 获取购物车数据
// Url:/api/cart/cartList    method：get
export const reqShopCart=()=>requests({
    url:'/cart/cartList',
    method:'GET'
})

// 删除购物车产品的接口
// URL:/api/cart/deleteCart/{skuId}    method：DELETE
export const reqDeleteCartById=(skuId)=>requests({
    url:`cart/deleteCart/${skuId}`,
    method:'DELETE'
})

// 切换商品选中状态
// URL：/api/cart/checkCart/{skuID}/{isChecked}    method：GET
export const reqCheckStatus = (skuId,isChecked)=>requests({
  url:`cart/checkCart/${skuId}/${isChecked}`,
  method:'GET'
})

// 获取验证码
// /api/user/passport/sendCode/{phone}    GET
export const reqCode = (phone)=>requests({
  url:`user/passport/sendCode/${phone}`,
  method:'GET'
})

// 注册账号
// /api/user/passport/register    POST
export const reqRegister = (params)=>requests({
  url:`user/passport/register`,
  data:params,
  method:'POST'
})

// 登录账号
// /api/user/passport/login     POST   phone,password
export const reqUserLogin = (params)=>requests({
  url:'user/passport/login',
  data:params,
  method:'POST'
})

// 获取用户信息，需要用token向服务器要用户信息
// api/user/passport/auth/getUserInfo     GET
export const reqUserInfo = ()=>requests({
  url:'user/passport/auth/getUserInfo',
  method:'GET'
})

// 退出登录
// /api/user/passport/logout   GET
export const reQuitRegister=()=>requests({
  url:'user/passport/logout',
  method:'GET'
})

// 获取用户地址
//  /api/user/userAddress/auth/findUserAddressList   GET
export const reqUserAddress=()=>requests({
  url:'user/userAddress/auth/findUserAddressList',
  method:'GET'
})

// 获取订单页
// /api/order/auth/trade    GET
export const reqOrderInfo=()=>requests({
  url:'order/auth/trade',
  method:'GET'
})

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}     POST  注意参数
export const reqSubmitOrder=(tradeNo,data)=>requests({
  url:`order/auth/submitOrder?tradeNo=${tradeNo}`,
  method:'POST',
  data
})

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}      GET    注意参数
export const reqOrderPayment=(orderId)=>requests({
  url:`payment/weixin/createNative/${orderId} `,
  method:'GET'
})

// 获取支付订单状态
// /api/payment/weixien/queryPayStatus/{orderId}    GET
export const reqPayStatus=(orderId)=>requests({
  url:`payment/weixin/queryPayStatus/${orderId}`,
  method:'GET'
})

// 获取订列表
// /api/order/auth/{page}/{limit}         GET   注意参数
export const reqMyOrderList=(page,limit)=>requests({
  url:`order/auth/${page}/${limit}`,
  method:'GET'
})