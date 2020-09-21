/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-21 14:48:16
 * @LastEditTime: 2020-09-21 15:06:02
 */
import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _pwd = ""; //密码
  String _account = "";

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        padding: EdgeInsets.all(25.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Welcome",
              style: TextStyle(fontSize: 30),
            ),
            SizedBox(
              height: 25,
            ),
            TextField(
              // controller: _controller,
              onChanged: (value) {
                this._account = value;
              },
              decoration: new InputDecoration(
                  // helperText: '请输入你的账号',
                  hintText: '请输入账号',
                  labelText: "请输入账号",
                  icon: Icon(Icons.people),
                  border: OutlineInputBorder(

                      ///设置边框四个角的弧度
                      borderRadius: BorderRadius.all(Radius.circular(10)),

                      ///用来配置边框的样式
                      borderSide: BorderSide(
                        ///设置边框的颜色
                        // color: Colors.red,

                        ///设置边框的粗细
                        width: 2.0,
                      ))),
            ),
            SizedBox(
              height: 15,
            ),
            TextField(
              obscureText: true, //输入密码显示*********
              // controller: _controller,
              onChanged: (value) {
                this._pwd = value;
              },
              keyboardType: TextInputType.number,
              decoration: new InputDecoration(
                // helperText: '请输入你的账号',
                hintText: '请输入密码',
                labelText: "请输入密码",
                icon: Icon(Icons.lock),
                border: OutlineInputBorder(

                    ///设置边框四个角的弧度
                    borderRadius: BorderRadius.all(Radius.circular(10)),

                    ///用来配置边框的样式
                    borderSide: BorderSide(
                      ///设置边框的颜色
                      color: Colors.black,

                      ///设置边框的粗细
                      width: 2.0,
                    )),
              ),
            ),
            SizedBox(
              height: 15,
            ),
            RaisedButton(
              color: Colors.blue,
              child: Text("登录"),
              onPressed: () {
                print("login" + this._account + ":" + this._pwd);

                // 第一种跳转界面
                // Navigator.push(context, MaterialPageRoute(builder: (_) {
                //   return SecondPage();
                // }));
                // 第二种跳转界面  需要在配置 routes
                // Navigator.pushNamed(context, "/SecondPage");
              },
            )
          ],
        ),
      ),
    );
  }
}
