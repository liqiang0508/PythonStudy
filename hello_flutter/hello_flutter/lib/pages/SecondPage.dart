/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-17 15:09:18
 * @LastEditTime: 2020-09-18 17:20:56
 */
import 'package:flutter/material.dart';

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

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text('SecondPage'),
        centerTitle: true,
      ),
      body: ListView(
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
    );
  }

  // _onclick() {}
}
// ListTile(
//                   title: Text(e["name"]), leading: Image.network(e["imgurl"])))
