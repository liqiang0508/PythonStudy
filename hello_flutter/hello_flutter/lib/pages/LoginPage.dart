/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-21 14:48:16
 * @LastEditTime: 2020-10-15 09:37:05
 */
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import '../widgets/DrawerPage.dart';
import 'SecondPage.dart';
import 'package:intl/intl.dart' as intl;

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String _pwd = ""; //密码
  String _account = "";
  bool passwordVisible = true;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print(intl.Intl.getCurrentLocale());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        drawer: DrawerPage(),
        appBar: new AppBar(
          title: new Text('Welcome to Flutter'),
          centerTitle: true,
        ),
        body: Center(
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
                      enabledBorder: OutlineInputBorder(
                          //没选中颜色
                          ///设置边框四个角的弧度
                          borderRadius: BorderRadius.all(Radius.circular(10)),

                          ///用来配置边框的样式
                          borderSide: BorderSide(
                            ///设置边框的颜色
                            color: Colors.black12,

                            ///设置边框的粗细
                            width: 2.0,
                          )),
                      focusedBorder: OutlineInputBorder(
                          //选中颜色
                          ///设置边框四个角的弧度
                          borderRadius: BorderRadius.all(Radius.circular(10)),

                          ///用来配置边框的样式
                          borderSide: BorderSide(
                            ///设置边框的颜色
                            color: Colors.blue,

                            ///设置边框的粗细
                            width: 2.0,
                          ))),
                ),
                SizedBox(
                  height: 15,
                ),
                TextField(
                  obscureText: this.passwordVisible, //输入密码显示*********
                  // controller: _controller,
                  onChanged: (value) {
                    this._pwd = value;
                  },
                  // cursorColor: Colors.pink,//光标颜色
                  keyboardType: TextInputType.number,
                  decoration: new InputDecoration(
                    // helperText: '请输入你的账号',
                    hintText: '请输入密码',
                    labelText: "请输入密码",
                    icon: Icon(Icons.lock),
                    suffixIcon: IconButton(
                        icon: Icon(
                          //根据passwordVisible状态显示不同的图标
                          passwordVisible
                              ? Icons.visibility
                              : Icons.visibility_off,
                          color: Theme.of(context).primaryColorDark,
                        ),
                        onPressed: () {
                          //更新状态控制密码显示或隐藏
                          setState(() {
                            passwordVisible = !passwordVisible;
                          });
                        }),
                    enabledBorder: OutlineInputBorder(
                        //没选中颜色
                        ///设置边框四个角的弧度
                        borderRadius: BorderRadius.all(Radius.circular(10)),

                        ///用来配置边框的样式
                        borderSide: BorderSide(
                          ///设置边框的颜色
                          color: Colors.black12,

                          ///设置边框的粗细
                          width: 2.0,
                        )),
                    focusedBorder: OutlineInputBorder(
                        //选中颜色

                        ///设置边框四个角的弧度
                        borderRadius: BorderRadius.all(Radius.circular(10)),

                        ///用来配置边框的样式
                        borderSide: BorderSide(
                          ///设置边框的颜色
                          color: Colors.blue,

                          ///设置边框的粗细
                          width: 2.0,
                        )),
                  ),
                ),
                SizedBox(
                  height: 55,
                ),
                Container(
                  width: 250,
                  child: RaisedButton(
                    shape: RoundedRectangleBorder(
                        // side: BorderSide.none,
                        borderRadius: BorderRadius.all(Radius.circular(50))),
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
                      Navigator.push(
                          context,
                          PageTransition(
                              type: PageTransitionType.rightToLeft,
                              child: SecondPage()));
                    },
                  ),
                )
              ],
            ),
          ),
        ));
  }
}
