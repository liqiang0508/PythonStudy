# -*- coding: utf-8 -*-
#module import
import requests,json
import os
#function
def spider(type,id):
    url = 'https://www.kuaidi100.com/query?type=%s&postid=%s' %(type,id)
    data = requests.get(url)
    json = data.json()
    if json['status'] == "200":
        data_json = json['data']
        print(u"//////////////快递详细信息//////////////")
        for x in data_json:
            print("%s : %s" %(x['time'],x['context']))
    else:
        print("错误的快递单号!")
    os.system('pause')

def express_type_get():
    express_type = ('shunfeng','yunda','shentong','yuantong','zhongtong','ems','tiantian','huitongkuaidi','quanfengkuaidi','youzhengguonei')
    print(u'////////////////快递公司////////////////\n1.顺丰   2.韵达    3.申通    4.圆通    5.中通\n6.EMS 7.天天    8.汇通    9.全峰    10.邮政\n////////////////////////////////////////')
    while True:
        express = int(input('请选择快递公司(数字):'))
        if express:
            if express <= 10 and express >= 1:
                break
            else:
                print(u"错误的选择!")
        else:
            print(u"不能为空!")
    return express_type[express-1]
def express_id_get():
    while True:
        express_id = input('请输入快递单号:')
        if express_id:
            break
        else:
            print(u"快递单号不能为空!")
    return express_id
#Mainprogram
kd = express_type_get()
kd_id = express_id_get()
spider(kd,kd_id)
