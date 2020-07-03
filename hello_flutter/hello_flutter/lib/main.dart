import 'package:flutter/material.dart';
// import 'package:english_words/english_words.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Welcome to Flutter',
      home: new Scaffold(
          appBar: new AppBar(
            title: new Text('Welcome to Flutter'),
          ),
          body: Container(
            // width: 80,
            color: Colors.red,
          )
          // new Row(
          //   mainAxisAlignment: MainAxisAlignment.spaceAround,
          //   children: [
          //     new Text('Hello'),
          //     new Text('Hello world'),
          //   ],
          // ),
          ),
    );
  }
}
