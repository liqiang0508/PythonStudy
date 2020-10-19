/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-07-03 14:20:17
 * @LastEditTime: 2020-10-15 09:45:25
 */
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
// import 'package:english_words/english_words.dart';
import 'generated/l10n.dart';
import "pages/SecondPage.dart";
import "pages/LoginPage.dart";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      localizationsDelegates: [
        S.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: S.delegate.supportedLocales,
      locale: Locale("en"),
      debugShowCheckedModeBanner: false,
      initialRoute: "/LoginPage",
      routes: {
        "/SecondPage": (context) => SecondPage(),
        "/LoginPage": (context) => LoginPage(),
      }, //路由配置
    );
  }
}
