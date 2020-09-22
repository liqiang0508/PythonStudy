import 'dart:async';
import 'dart:ffi';

import 'package:flutter/services.dart';

class FlutterPluginDemon {
  static const MethodChannel _channel =
      const MethodChannel('flutter_plugin_demon');

  static Future<String> get platformVersion async {
    final String version = await _channel.invokeMethod('getPlatformVersion');
    return version;
  }

  static Future<double> get battery async {
    final double version = await _channel.invokeMethod('getBattery');
    return version;
  }
}
