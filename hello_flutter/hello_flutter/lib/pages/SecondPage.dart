/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-17 15:09:18
 * @LastEditTime: 2020-09-18 16:50:01
 */
import 'package:flutter/material.dart';

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text('SecondPage'),
        centerTitle: true,
      ),
      body: ListView(children: <Widget>[]),
      // body: Center(
      //     child: RaisedButton(
      //         child: Text("go MainPage"),
      //         onPressed: () {
      //           Navigator.push(context, MaterialPageRoute(builder: (_) {
      //             return new Home();
      //           }));
      //         })),
    );
  }

  // _onclick() {}
}
