/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-07-03 14:20:17
 * @LastEditTime: 2020-09-21 16:26:22
 */
import 'package:flutter/material.dart';
// import 'package:english_words/english_words.dart';
import "pages/SecondPage.dart";
import "pages/LoginPage.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // title: 'Welcome to Flutter',
      debugShowCheckedModeBanner: false,
      home: Home(),
      routes: {
        "/SecondPage": (context) => SecondPage(),
        "/LoginPage": (context) => LoginPage(),
      }, //路由配置
    );
  }
}

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _HomePage();
  }
}

class _HomePage extends State<Home> {
  // 弹出对话框
  final TextEditingController _controller = new TextEditingController();

  Future<bool> showDeleteConfirmDialog1() {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return AlertDialog(
          title: Text("提示"),
          content: Text("您确定要删除当前文件吗?"),
          actions: <Widget>[
            FlatButton(
              child: Text("取消"),
              onPressed: () => Navigator.of(context).pop(), // 关闭对话框
            ),
            FlatButton(
              child: Text("middle"),
              onPressed: () => Navigator.of(context).pop(), // 关闭对话框
            ),
            FlatButton(
              child: Text("删除"),
              onPressed: () {
                //关闭对话框并返回true
                Navigator.of(context).pop(true);
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return
        // title: 'Welcome to Flutter',

        Scaffold(
      drawer: Drawer(
          child: Column(
        children: <Widget>[
          Row(
            children: <Widget>[
              Expanded(
                child: UserAccountsDrawerHeader(
                    accountEmail: Text(
                      "xxxx@qq.com",
                      style: TextStyle(fontSize: 20),
                    ),
                    accountName: Text("Lee", style: TextStyle(fontSize: 20)),
                    currentAccountPicture: CircleAvatar(
                        backgroundImage: NetworkImage(
                            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2271338977,1611087163&fm=26&gp=0.jpg"))),
              )
            ],
          ),
          ListTile(
            title: Text("我的空间"),
            leading: Icon(Icons.home),
            onTap: () {
              print("点击我的空间");
            },
          ),
          Divider(
            thickness: 1,
            color: Colors.black,
          ),
          ListTile(
            title: Text("设置"),
            leading: Icon(Icons.settings),
            onTap: () {
              print("点击了设置");
            },
          ),
          Divider(
            thickness: 1,
            color: Colors.black,
          ),
          ListTile(
            title: Text("用户中心"),
            leading: Icon(Icons.people),
            onTap: () {
              print("点击用户中心");
            },
          ),
          Divider(
            thickness: 1,
            color: Colors.black,
          ),
        ],
      )),
      appBar: new AppBar(
        title: new Text('Welcome to Flutter'),
        centerTitle: true,
      ),
      body: LoginPage(),
    );
  }
}
