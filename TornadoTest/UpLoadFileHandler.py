# -*- coding: utf-8 -*-
# 文件上传测试
import tornado

UPLOADPATH = "static/uploadfile"  # 上传文件夹名称


class UpLoadFile(tornado.web.RequestHandler):

    def data_received(self, chunk):
        pass

    def get(self):
        self.render('UpLoadFile.html')

    # @tornado.web.asynchronous 如果是耗时的操作 要加上 然后最后调用finish
    def post(self):
        file_metas = self.request.files["uploadFile"]  # 获取上传文件信息
        file_key = self.get_argument("file_key")  # 获取提交的file_key字段
        save_path = ""
        for meta in file_metas:  # 循环文件信息
            file_name = meta['filename']  # 获取文件的名称
            save_path = os.path.join(UPLOADPATH, file_name).replace("\\", "/")
            print("upload_file===", save_path)
            with open(save_path, 'wb') as up:  # os拼接文件保存路径，以字节码模式打开
                up.write(meta['body'])
                up.close()
        self.redirect("upload_success?path=" + save_path)
        # self.finish()
        # self.redirect("https://www.baidu.com/")


# 文件成功上传
class UpLoadFileSuccess(tornado.web.RequestHandler):

    def data_received(self, chunk):
        pass

    def get(self):
        path = self.get_argument('path')
        self.render('UpLoadFileSuccess.html', filePath=path)
