/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-07-03 14:20:17
 * @LastEditTime: 2020-07-14 09:51:01
 */
import 'package:flutter/material.dart';
// import 'package:english_words/english_words.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      debugShowCheckedModeBanner: false,
      home: Home(),
    );
  }
}

class Home extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _HomePage();
  }
}

class _HomePage extends State<Home> {
  // 弹出对话框
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
      title: 'Welcome to Flutter',
      home: new Scaffold(
          appBar: new AppBar(
            title: new Text('Welcome to Flutter'),
          ),
          body: Center(
              child: Listener(
            child: Container(
              width: 150,
              height: 150,
              color: Colors.red,
              child: Center(
                  child: RaisedButton(
                child: Text("btn"),
                onPressed: () async {
                  print("onPressed");
                  bool delete = await showDeleteConfirmDialog1();
                  if (delete == null) {
                    print("取消删除");
                  } else {
                    print("已确认删除");
                    //... 删除文件
                  }
                  // showDialog(
                  //     barrierDismissible: true, //是否点击空白区域关闭对话框,默认为true，可以关闭
                  //     context: context,
                  //     builder: (BuildContext context) {
                  //       return AlertDialog(
                  //         title: Text("提示"),
                  //         content: Text("您确定要删除当前文件吗?"),
                  //         actions: <Widget>[
                  //           FlatButton(
                  //             child: Text("取消"),
                  //             onPressed: () =>
                  //                 Navigator.of(context).pop(), // 关闭对话框
                  //           ),
                  //           FlatButton(
                  //             child: Text("删除"),
                  //             onPressed: () {
                  //               //关闭对话框并返回true
                  //               Navigator.of(context).pop(true);
                  //             },
                  //           ),
                  //         ],
                  //       );
                  //     });
                },
              )),
            ),
            onPointerDown: (down) {
              print("onPointerDown");
            },
            onPointerUp: (event) {
              print("onPointerUp");
            },
            onPointerCancel: (event) {
              print("onPointerCancel");
            },
          ))),
    );
  }
}
