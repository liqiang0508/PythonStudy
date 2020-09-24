/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-07-03 14:20:17
 * @LastEditTime: 2020-09-24 14:25:41
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
      debugShowCheckedModeBanner: false,
      initialRoute: "/LoginPage",
      routes: {
        "/SecondPage": (context) => SecondPage(),
        "/LoginPage": (context) => LoginPage(),
      }, //路由配置
    );
  }
}
