var os = require("os")

// var hello = require("./hello")
// hello.world()

// var buffer = new Buffer('www.runoob.com');
// //  缓冲区长度
// console.log("buffer length: " + buffer.length);


// var buf = new Buffer(26);
// for (var i = 0 ; i < 26 ; i++) {
//   buf[i] = i + 97;
// }

// console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
// console.log( buf.toString('ascii',0,5));   // 输出: abcde
// console.log( buf.toString('utf8',0,5));    // 输出: abcde
// console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


// var buf = new Buffer('www.runoob.com');
// var json = buf.toJSON(buf);
// console.log(json);
// console.log( __filename );
// console.log( __dirname );

// function printHello(){
//    console.log( "Hello, World!");
// }

// console.log("hostname=="+os.hostname());
// console.log('platform : ' + os.platform());

// // // 两秒后执行以上函数
// // setTimeout(printHello, 2000);
// var Person = require("./protohelper").Person

// var p = new Person.Person();
// p.setName("Lee");
// var data = p.serializeBinary()
// console.log("getname--",p.getName());
// console.log(data)

// var  bufferArray = new Buffer(data);
// console.log("bufferArray==",bufferArray.toString());

// var buf = new Buffer(bufferArray.toString());
// console.log("buff===",buf);

// buf.write(bufferArray.toString());
// console.log("buff===",buf);

// var p1 = Person.Person.deserializeBinary(data);
// // p1.deserializeBinary(data);

// console.log("--",p1.getName());


// protobufjs test
// require("./protobuf");
// require("./bytebuffer");
// require("./long");

var Person = require("./person");

var person =  Person.Person.create({"id":155,"name":"Lee"});
console.log(person.id);
console.log(person.name);

// var pd = $root.Person.create({id:1})
var bytes = Person.Person.encode(person).finish();
console.log(bytes);


var p  = Person.Person.decode(bytes);

console.log(p);