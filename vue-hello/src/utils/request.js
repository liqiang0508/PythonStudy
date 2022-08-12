/*
 * @Author: liqiang
 * @Date: 2022-08-10 10:26:21
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-12 09:22:04
 * @FilePath: \vue-hello\src\utils\request.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */

// /utils/request.js(接口的封装)
import axios from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 500
})

service.interceptors.request.use(
  config => {
    config.headers['X-Token'] = getToken()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptors
service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    console.error('Error')
  } else {
    return res.data
  }
}, error => {
  console.log('err', error)
  return Promise.reject(error)
})
export default service

export function request2Sever(url, params) {
    return new Promise((resolve, reject) => {
      service.get(url, {
        params: params
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  
  export function post2Sever(url, params) {
    return new Promise((resolve, reject) => {
      service.post(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

