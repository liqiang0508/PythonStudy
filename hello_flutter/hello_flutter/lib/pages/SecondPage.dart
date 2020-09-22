/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-17 15:09:18
 * @LastEditTime: 2020-09-22 11:32:55
 */
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

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
  static const platform = const MethodChannel('samples.flutter.io/battery');
  String _batteryLevel = 'Unknown battery level.';

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
                              // Divider(
                              //   thickness: 1,
                              // )
                            ],
                          ))
                      .toList()),
            ),
            Text(this._batteryLevel),
            RaisedButton(
              child: Text("获取电量"),
              onPressed: _getBatteryLevel,
            )
          ],
        )));
  }

  Future<Null> _getBatteryLevel() async {
    String batteryLevel;
    try {
      final int result = await platform.invokeMethod('getBatteryLevel');
      batteryLevel = 'Battery level at $result % .';
    } on PlatformException catch (e) {
      batteryLevel = "Failed to get battery level: '${e.message}'.";
    }

    print(batteryLevel);
    setState(() {
      _batteryLevel = batteryLevel;
    });
  }
}
// : Column(
//           children: <Widget>[
//             Container(
//               height: 50,
//               child: ListView(
//                   scrollDirection: Axis.vertical,
//                   children: listData
//                       .map((e) => Column(
//                             children: <Widget>[
//                               ListTile(
//                                   title: Text(e["name"]),
//                                   leading: Image.network(e["imgurl"])),
//                               Divider(
//                                 thickness: 1,
//                               )
//                             ],
//                           ))
//                       .toList()),
//             ),
//             Text(this._batteryLevel),
//             RaisedButton(
//               child: Text("获取电量"),
//               onPressed: _getBatteryLevel,
//             )
//           ],
//         ),
//       ),
