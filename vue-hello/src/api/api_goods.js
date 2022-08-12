/*
 * @Author: liqiang
 * @Date: 2022-08-11 20:23:20
 * @LastEditors: liqiang
 * @LastEditTime: 2022-08-12 09:27:09
 * @FilePath: \vue-hello\src\api\api_goods.js
 * @Description: 
 * 
 * Copyright (c) 2022 by superZ, All Rights Reserved. 
 */

import {request2Sever} from '@/utils/request'


/**
 * @description: 获取商品信息
 * @param {*} params
 * @return {*}
 */
export function getGoods(params)
{
    return request2Sever(
        '/getGoods',
        params
      )
}