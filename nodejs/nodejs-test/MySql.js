var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456',
//   database : 'hello'
// });

var connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'hello'
});
 
// connection.connect();
 
// connection.
// querypool('SELECT * FROM  person', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });

// var sql = 'SELECT * FROM  person';
// query(sql,function(error, results, fields){});

String.prototype.format = function(args) {
	var result = this;
	if (arguments.length > 0) {
		if (arguments.length == 1 && typeof (args) == "object") {
			for (var key in args) {
				if(args[key]!=undefined){
					var reg = new RegExp("({" + key + "})", "g");
					result = result.replace(reg, args[key]);
				}
			}
		}
		else {
			for (var i = 0; i < arguments.length; i++) {
				if (arguments[i] != undefined) {
					//var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
					var reg = new RegExp("({)" + i + "(})", "g");
					result = result.replace(reg, arguments[i]);
				}
			}
		}
	}
	return result;
};

function query(sql,callback){  
    connection.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};

exports.get_userInfo = function(data,callback){
	if(data.id)
	{
			var sql = 'SELECT * FROM UserInfo WHERE id = "' + data.id + '"';
    		query(sql, function(err, rows, fields) {
			        if (err) {
			            callback(rows);
			            throw err;
			        }
			        else{
			            if(rows.length > 0){
			                callback(rows);
			            }
			            else{
			                callback(rows);
			            }
			        }
			    });
	}

	if(data.udid)
	{
			var sql = 'SELECT * FROM UserInfo WHERE udid = "' + data.udid + '"';
    		query(sql, function(err, rows, fields) {
			        if (err) {
			            callback(fields);
			            throw err;
			        }
			        else{
			            if(rows.length > 0){
			                callback(rows);
			            }
			            else{
			                callback(rows);
			            }
			        }
			    });
	}


}


exports.create_account = function(data,callback){ 
	callback = callback == null? nop:callback;
	if (data.id==null)
	{

		data.id = Math.random()*1000000;
	}

	 var sql = 'INSERT INTO UserInfo(id,name,udid,loginType) VALUES("{0}","{1}",{2},"{3}")';
	 var sql = sql.format(data.id,data.name,data.udid,data.loginType);
	 console.log("sql--------",sql);
	 query(sql, function(err, rows, fields) {
        if (err) {
            throw err;
        }
        callback(rows);
    });


} 
exports.is_account_exist = function(udid,callback){
    callback = callback == null? nop:callback;
    if(udid == null){
        callback(false);
        return;
    }
    var sql = 'SELECT * FROM UserInfo WHERE udid = "' + udid + '"';
    query(sql, function(err, rows, fields) {
        if (err) {
            callback(false);
            throw err;
        }
        else{
            if(rows.length > 0){
                callback(true);
            }
            else{
                callback(false);
            }
        }
    });
};

exports.login = function (sql,callback){  
    connection.getConnection(function(err,conn){  
        if(err){  
            callback(err,null,null);  
        }else{  
            conn.query(sql,function(qerr,vals,fields){  
                //释放连接  
                conn.release();  
                //事件驱动回调  
                callback(qerr,vals,fields);  
            });  
        }  
    });  
};

exports.query = query;

// function query(sql,callback)
// {
// 		connection.query(sql, function (error, results, fields) 
// 		{
//   			if (error) {
//   				console.log('The solution is: ', results);
//   				callback(error, results, fields);
// 			}
// 			else
// 			{
// 				callback(error, null, null);
// 			}
// 		});
// }