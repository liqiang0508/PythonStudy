exports.world = function() {
  console.log('Hello World-----');
}

var EventEmitter = require('events').EventEmitter
var event = new EventEmitter();

event.on("test",function(){

	console.log("test on");
});
setTimeout(function(){
	event.emit("test");}, 1000);


var myModule = require('./Module');
myModule = new myModule();
myModule.setName("LEE");
myModule.sayHello();

var somepackage =require('./somepackage');
somepackage.hello();

var th = "หมอบ";
for (var i = 0; i < th.length; i++) {
	console.log(i,th.charCodeAt(i));
}

// console.log("22",String.fromCharCode(3610));

