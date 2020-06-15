var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");

var url = 'http://bbs.dospy.com/';

function getdata(str)
{
	var $ = cheerio.load(str);
	var b = $('.com-list');

	// console.log("b===",b);
	if(fs.existsSync('input.txt'))
	{
		fs.unlinkSync('input.txt');
	}
	
	 b.find("ul").find("li").each(function(item) {

	 	 var data = $(this);
	 	 var title = data.find("h3").text();
	 	 console.log(title);

	 	 fs.appendFileSync('input.txt', title+'\r\n')
	 	  // function(err) {
		   // if (err) {
		   //     return console.error(err);
		   // }});

	 });
	// b.each(function(item){class="s-mblock-content s-opacity-blank3"

	// 	var data = $(this);
	// 	var title = data.find('nav-item s-opacity-blank3');
	// 	console.log("title",title);
	// })

}

http.get(url,function(res){

	var html ='';
	res.on('data',function(data){
		html += data;
	})

	res.on('end',function(data){
	 // console.log(html);
		getdata(html);
	})
}).on('error',function(error){

	console.log("error==",error);
})