/*
 * @Author: liqiang
 * @Date: 2022-08-12 17:16:41
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-15 10:04:23
 * @FilePath: \vue-hello\src\store\modules\moduleA.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */
import { COUNT_ADD,COUNT_TEST} from '../mutations_type.js'
const moduleA = {
    // namespaced: true,
    state:{
        count:1,
        info:{
            age:0,
            name:'Lee'
        }
    },
    mutations:{
        [COUNT_ADD](state){
            state.count = state.count + 1
        },
        [COUNT_TEST](state,param){
            state.info.age = state.info.age + param.age
        }
    },
    action:{

    }
    
}

export default moduleA;