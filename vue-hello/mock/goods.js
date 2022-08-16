/*
 * @Author: liqiang
 * @Date: 2022-08-10 10:24:52
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-16 20:15:19
 * @FilePath: \vue-hello\mock\goods.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */

// /mock/course.js(模块中的模拟数据的创建)
const Mock = require('mockjs')

function getGoods() {
  const list = []
  const count = 1 // 定义创建的数据个数
  for (let i = 0; i < count; i++) {
    list.push(Mock.mock({
      // 商品Id
      id: '@increment',
      //商品名称
      name: '@ctitle(5,10)',
      //商品地址
      address: '@county(true)',
      //商品等级评价★
      star: '@string("★",1,3)',
      //商品图片
      image: '@Image("100x100","@color","")',
      //商品售价
      price: '@float(0, 100, 2, 2)'
    }))
  }
  return list

}

module.exports = [
  {
    url: '/getGoods',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          total: getGoods().length,
          list: getGoods()
        }
      }
    }
  }
]
