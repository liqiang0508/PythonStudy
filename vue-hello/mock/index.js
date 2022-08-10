/*
 * @Author: liqiang
 * @Date: 2022-08-10 10:23:45
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-10 10:23:46
 * @FilePath: \vue-hello\mock\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */

// /mock/index.js文件(mock的总引用文件)
const Mock = require('mockjs')
const course= require('./course')

const mocks = [
   ...course
]

function mockXHR() {
 for (const i of mocks) {
   Mock.mock(new RegExp(i.url), i.type || 'get', i.response)
 }
}

module.exports = {
 mocks,
 mockXHR
}
