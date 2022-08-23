/*
 * @Author: liqiang
 * @Date: 2022-08-10 14:17:26
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-23 10:39:04
 * @FilePath: \vue-hello\src\router\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */
import VueRouter from 'vue-router'
import Vue from 'vue'

import HelloWorld from '../components/HelloWorld.vue'
import AboutPage from '../components/AboutPage.vue'
// 通过vue.use(插件)，安装插件
Vue.use(VueRouter)
// 创建路由对象
const routes = [
    {
        path: '/home',
        component: HelloWorld
    }, {
        path: '/about',
        component: AboutPage
    },
    {
        path: '*',
        redirect:"/home"
    }]
const router = new VueRouter({
    // 配置URL和组价直接的映射关系
    routes,
    // history模式 
    mode: 'history'
})
// 将router对象传入到vue实例中
export default router