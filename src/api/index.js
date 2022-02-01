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