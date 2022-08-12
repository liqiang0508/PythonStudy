/*
 * @Author: liqiang
 * @Date: 2022-08-12 17:14:40
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-12 17:58:40
 * @FilePath: \vue-hello\src\store\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */

import moduleA from './modules/moduleA.js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        moduleA: moduleA,
    }
})

export default store;