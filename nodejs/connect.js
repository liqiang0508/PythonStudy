var connect = require("connect");
var app = connect();
app.use(logger);
app.use(hello);
app.listen(3000);

function  logger(req,res,next)
{
	console.log("%s,%s",req.method,req.url);
	next();
}


function  hello(req,res,next)
{	res.setHeader('Content-Type',"text/plain");
	res.end("hello");
} 