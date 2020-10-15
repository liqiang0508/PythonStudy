// DO NOT EDIT. This is code generated via package:intl/generate_localized.dart
// This is a library that provides messages for a zh locale. All the
// messages from the main program should be duplicated here with the same
// function name.

// Ignore issues from commonly used lints in this file.
// ignore_for_file:unnecessary_brace_in_string_interps, unnecessary_new
// ignore_for_file:prefer_single_quotes,comment_references, directives_ordering
// ignore_for_file:annotate_overrides,prefer_generic_function_type_aliases
// ignore_for_file:unused_import, file_names

import 'package:intl/intl.dart';
import 'package:intl/message_lookup_by_library.dart';

final messages = new MessageLookup();

typedef String MessageIfAbsent(String messageStr, List<dynamic> args);

class MessageLookup extends MessageLookupByLibrary {
  String get localeName => 'zh';

  static m0(name) => "欢迎 ${name}";

  static m1(gender) => "${Intl.gender(gender, female: 'Hi woman!', male: 'Hi man!', other: 'Hi there!')}";

  static m2(role) => "${Intl.select(role, {'admin': 'Hi admin!', 'manager': 'Hi manager!', 'other': 'Hi visitor!', })}";

  static m3(howMany) => "${Intl.plural(howMany, one: '1 message', other: '${howMany} messages')}";

  final messages = _notInlinedMessages(_notInlinedMessages);
  static _notInlinedMessages(_) => <String, Function> {
    "pageHomeConfirm" : MessageLookupByLibrary.simpleMessage("确定"),
    "pageHomeWelcome" : m0,
    "pageHomeWelcomeGender" : m1,
    "pageHomeWelcomeRole" : m2,
    "pageNotificationsCount" : m3
  };
}
