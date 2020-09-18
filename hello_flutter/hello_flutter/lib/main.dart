/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-07-03 14:20:17
 * @LastEditTime: 2020-09-18 13:57:09
 */
import 'package:flutter/material.dart';
// import 'package:english_words/english_words.dart';
import "SecondPage.dart";

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
  int _counter = 0;

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
    return new MaterialApp(
        // title: 'Welcome to Flutter',

        home: new Scaffold(
      appBar: new AppBar(
        title: new Text('Welcome to Flutter'),
        centerTitle: true,
      ),
      body: Center(
          child: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              this._counter.toString(),
              style: TextStyle(fontSize: 25),
            ),
            SizedBox(
              height: 15,
            ),
            TextField(
              controller: _controller,
              decoration: new InputDecoration(
                  // helperText: '请输入你的账号',
                  hintText: '请输入账号',
                  icon: Icon(Icons.text_fields)),
            ),
            SizedBox(
              height: 15,
            ),
            TextField(
              controller: _controller,
              decoration: new InputDecoration(
                  // helperText: '请输入你的账号',
                  hintText: '请输入密码',
                  icon: Icon(Icons.lock)),
            ),
            SizedBox(
              height: 15,
            ),
            RaisedButton(
              color: Colors.blue,
              child: Text("登录"),
              onPressed: () {
                print("login");
                setState(() {
                  this._counter++;
                });
                Navigator.push(context, MaterialPageRoute(builder: (_) {
                  return SecondPage();
                }));
              },
            )
          ],
        ),
      )),
    ));
  }
}
