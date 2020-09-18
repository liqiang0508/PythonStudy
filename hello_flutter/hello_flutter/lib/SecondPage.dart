/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-17 15:09:18
 * @LastEditTime: 2020-09-18 14:09:57
 */
import 'package:flutter/material.dart';
import "main.dart";

class SecondPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: new Text('SecondPage'),
        centerTitle: true,
      ),
      body: ListView(
        children: <Widget>[
          ListTile(
            title: Text("adada"),
            leading: Icon(Icons.access_time),
            trailing: Image.network(
              "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600999242&t=97a8f980f1f1db816b634cd8902b7a02",
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 10),
          ListTile(
            title: Text("adada"),
            leading: Icon(Icons.access_time),
            trailing: Image.network(
              "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600999242&t=97a8f980f1f1db816b634cd8902b7a02",
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 10),
          ListTile(
            title: Text("adada"),
            leading: Icon(Icons.access_time),
            trailing: Image.network(
              "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600999242&t=97a8f980f1f1db816b634cd8902b7a02",
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 10),
          ListTile(
            title: Text("adada"),
            leading: Icon(Icons.access_time),
            trailing: Image.network(
              "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600999242&t=97a8f980f1f1db816b634cd8902b7a02",
              fit: BoxFit.cover,
            ),
          ),
          SizedBox(height: 10),
          ListTile(
            title: Text("adada"),
            leading: Icon(Icons.access_time),
            trailing: Image.network(
              "https://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1600999242&t=97a8f980f1f1db816b634cd8902b7a02",
              fit: BoxFit.cover,
            ),
          )
        ],
      ),
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
