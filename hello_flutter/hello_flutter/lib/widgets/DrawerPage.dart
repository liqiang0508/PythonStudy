/*
 * @Descripttion: 
 * @version: 
 * @Author: Lee
 * @Date: 2020-09-24 14:06:08
 * @LastEditTime: 2020-09-24 14:07:28
 */
import 'package:flutter/material.dart';

class DrawerPage extends StatefulWidget {
  DrawerPage({Key key}) : super(key: key);

  @override
  _DrawerPageState createState() => _DrawerPageState();
}

class _DrawerPageState extends State<DrawerPage> {
  @override
  Widget build(BuildContext context) {
    return Drawer(
        child: Column(
      children: <Widget>[
        Row(
          children: <Widget>[
            Expanded(
              child: UserAccountsDrawerHeader(
                  accountEmail: Text(
                    "xxxx@qq.com",
                    style: TextStyle(fontSize: 20),
                  ),
                  accountName: Text("Lee", style: TextStyle(fontSize: 20)),
                  currentAccountPicture: CircleAvatar(
                      backgroundImage: NetworkImage(
                          "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2271338977,1611087163&fm=26&gp=0.jpg"))),
            )
          ],
        ),
        ListTile(
          title: Text("我的空间"),
          leading: Icon(Icons.home),
          onTap: () {
            print("点击我的空间");
          },
        ),
        Divider(
          thickness: 1,
          color: Colors.black,
        ),
        ListTile(
          title: Text("设置"),
          leading: Icon(Icons.settings),
          onTap: () {
            print("点击了设置");
          },
        ),
        Divider(
          thickness: 1,
          color: Colors.black,
        ),
        ListTile(
          title: Text("用户中心"),
          leading: Icon(Icons.people),
          onTap: () {
            print("点击用户中心");
          },
        ),
        Divider(
          thickness: 1,
          color: Colors.black,
        ),
      ],
    ));
  }
}
