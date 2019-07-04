# -*- coding: utf-8 -*-
 
from django.http import HttpResponse
from django.shortcuts import render
from TestModel.models import Test
import json
import os
# 文件上传
def upload(request):
    # context = {}
    # return render(request, 'upload.html', context)
    # f = ""
    if request.method == 'POST':
        ret = {'status': False, 'data': None, 'error': None}
        try:
            user = request.POST.get('user')
            img = request.FILES.get('img')
            print "user=",user
            print "path=",os.path.join('static', img.name)
            f = open(os.path.join('static', img.name), 'wb')
            for chunk in img.chunks(chunk_size=1024):
                f.write(chunk)
            ret['status'] = True
            ret['data'] = os.path.join('static', img.name)
            f.close()
        except Exception as e:
            ret['error'] = e
        finally:
            
            return HttpResponse(json.dumps(ret))
    return render(request, 'upload.html')
    
# 数据库操作
def testdb(request):
    # test1 = Test(name='runoob',age = 32,when = "2019-03-01")
    # test1.save()
    # return HttpResponse("<p>数据添加成功！</p>")
    response = ""
    response1 = ""
    
    
    # 通过objects这个模型管理器的all()获得所有数据行，相当于SQL中的SELECT * FROM
    list = Test.objects.all()
        
    # filter相当于SQL中的WHERE，可设置条件过滤结果
    response2 = Test.objects.filter(id=1) 
    
    # 获取单个对象
    response3 = Test.objects.get(id=1) 
    
    # 限制返回的数据 相当于 SQL 中的 OFFSET 0 LIMIT 2;
    Test.objects.order_by('name')[0:2]
    
    #数据排序
    Test.objects.order_by("id")
    
    # 上面的方法可以连锁使用
    Test.objects.filter(name="runoob").order_by("id")
    
    # 输出所有数据
    for var in list:
        response1 += " id ="+str(var.id) + " name="+var.name + " age ="+str(var.age)+" time = "+str(var.time)+"</br>"
        # print(var.__dict__)
    response = response1
    return HttpResponse("<p>" + response + "</p>")