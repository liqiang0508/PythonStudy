/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-17 15:09:18
 * @LastEditTime: 2020-09-24 16:22:25
 */

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_plugin_test/flutter_plugin_test.dart';

final listData = [
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  },
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  },
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  },
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  },
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  },
  {
    "name": "Lee",
    "imgurl":
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1373560079,871367259&fm=26&gp=0.jpg"
  }
];

class SecondPage extends StatefulWidget {
  SecondPage({Key key}) : super(key: key);

  @override
  _SecondPageState createState() => _SecondPageState();
}

class _SecondPageState extends State<SecondPage> {
  // static const platform = const MethodChannel('samples.flutter.io/battery');
  String _batteryLevel = 'Unknown battery level.';
  String _platformVersion = 'Unknown';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: new AppBar(
          title: new Text('SecondPage'),
          centerTitle: true,
        ),
        body: Container(
            child: Column(
          children: <Widget>[
            Container(
              child: RefreshIndicator(
                onRefresh: _refresh,
                child: ListView(
                    shrinkWrap: true,
                    // physics: NeverScrollableScrollPhysics(),
                    scrollDirection: Axis.vertical,
                    children: listData
                        .map((e) => Column(
                              children: <Widget>[
                                ListTile(
                                    title: Text(e["name"]),
                                    leading: Image.network(e["imgurl"])),
                                Divider(
                                  thickness: 1,
                                )
                              ],
                            ))
                        .toList()),
              ),
            ),
            Text(this._batteryLevel),
            Text(this._platformVersion),
            RaisedButton(
              child: Text("获取电量"),
              onPressed: _getBatteryLevel,
            ),
            RaisedButton(
              child: Text("获取系统"),
              onPressed: _getPlatformState,
            ),
            MyButton(
                title: "我是标题",
                onPressCall: () {
                  print("onpresscalll");
                }),
          ],
        )));
  }

  Future _refresh() async {
    print("下拉刷新");
  }

  Future<void> _getPlatformState() async {
    String platformVersion;

    try {
      platformVersion = await FlutterPluginTest.platformVersion;
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }
    setState(() {
      _platformVersion = platformVersion;
    });
  }

  Future<Null> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final double result = await FlutterPluginTest.battery;
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }
    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
}

class MyButton extends StatefulWidget {
  MyButton({Key key, this.title = "", this.onPressCall}) : super(key: key);
  final onPressCall;
  final title;

  @override
  _MyButtonState createState() =>
      _MyButtonState(title: this.title, onPressCall: this.onPressCall);
}

class _MyButtonState extends State<MyButton> {
  var onPressCall;
  String title;

  _MyButtonState({this.title, this.onPressCall});
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      child: Text(this.title),
      onPressed: () {
        print("mybtn==");
        if (this.onPressCall != null) {
          this.onPressCall();
        }
      },
    );
  }
}

// class MyButton extends StatelessWidget {
//   const MyButton({this.title = "", this.onPressCall});
//   final title;
//   final onPressCall;
//   @override
//   Widget build(BuildContext context) {
//     return RaisedButton(
//       child: Text(this.title),
//       onPressed: () {
//         print("mybtn==");
//         if (this.onPressCall != null) {
//           this.onPressCall();
//         }
//       },
//     );
//   }
// }
