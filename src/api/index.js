// 当前的这个模块：API接口进行统一管理
import requests from "./request";

// 三级联动接口
// /api/product/getBaseCategoryList     GET请求，无参数

// 发请求 axios发请求返回结果是Promise对象
export const reqCategoryList =()=>requests({url:'/product/getBaseCategoryList', method:'GET',})



