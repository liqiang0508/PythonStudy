/*
 * @Author: liqiang
 * @Date: 2022-08-12 17:16:41
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-12 18:10:42
 * @FilePath: \vue-hello\src\store\modules\moduleA.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */
import { COUNT_ADD } from '../mutations_type.js'
const moduleA = {
    // namespaced: true,
    state:{
        count:1
    },
    mutations:{
        [COUNT_ADD](state){
            state.count = state.count + 1
        }
    },
    action:{

    }
    
}

export default moduleA;