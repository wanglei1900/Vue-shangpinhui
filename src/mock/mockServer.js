// 引入mockjs模块（mockjs）
import Mock from 'mockjs'

// 引入JSON数据格式【JSON根本没有暴露，但是可以引入进来】
// webpack默认对外的暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

// Mock模拟数据，第一个参数：请求地址（完整路径）   第二个参数：请求数据
Mock.mock('/mock/banner', {code:200,data:banner})
// Mock模拟数据，获取底部轮播图数据
Mock.mock('/mock/floor', {code:200, data:floor})

