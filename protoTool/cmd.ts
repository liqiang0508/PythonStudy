//@ts-nocheck
var CMD={};
var CMD2PB={};
CMD.Login = 100
CMD2PB[CMD.Login]={ name:"Login", pak:"tutorial.Person", file:"addressbook.pb" }
CMD.Login1 = 101
CMD2PB[CMD.Login1]={ name:"Login1", pak:"tutorial.Person", file:"addressbook.pb" }
CMD.Login2 = 102
CMD2PB[CMD.Login2]={ name:"Login2", pak:"tutorial.Person", file:"addressbook.pb" }

globalThis.CMD = CMD
globalThis.CMD2PB = CMD2PB
