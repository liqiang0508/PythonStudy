// var name;

// exports.setName = function(s){
//     name = s;
// };
// exports.sayHello = function(){
//     console.log('hello  '+name);
// };

function Hello() { 
	var name; 
	this.setName = function(thyName) { 
		name = thyName; 
	}; 
	this.sayHello = function() { 
		console.log('Hello ' + name); 
	}; 
}; 
module.exports = Hello;