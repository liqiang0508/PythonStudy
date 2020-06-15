var fs = require("fs")
var path = require('path');
var exec = require('child_process').exec;
// 关于文件的一些简单操作
var FileSys = {};

FileSys.GetFileData = function (path) {//获取文件数据

   var data = fs.readFileSync(path);
   return data;
	// body...
}


FileSys.copydir = function (src, dst)//复制文件夹
{

		var exists = fs.existsSync(dst)
		console.log("exists",exists);
		if(!exists)
		{
			fs.mkdirSync(dst);
		} 
		else
		{
			// fs.rmdirSync(dst);
		      exec('rm -rf '+dst,function(err,stdout,stderr) { 
			  console.log(err);
			});
		}

	 var subpaths = fs.readdirSync(src);
	 for (var i = 0; i < subpaths.length; ++i) {
	 	 if (subpaths[i][0] === '.') {
	 	 	console.log("00000000000")
            continue;
         }
	 	 console.log("src",subpaths[i]);
	 	 subpath = path.join(src, subpaths[i]);
         stat = fs.statSync(subpath);
         if (stat.isDirectory()) 
         {
            // readDir(subpath, obj);
           // fs.mkdirSync(path.join(dst,subpaths[i]));
            // console.log("dir");
            this.copydir(subpath,path.join(dst,subpaths[i]));
         }
         else if (stat.isFile())
         {
         	 this.copy(subpath,path.join(dst,subpaths[i]));
        	 console.log("copy to",path.join(dst,subpaths[i]));
         }
	 }
}

FileSys.travel = function(dir, callback) {//遍历文件夹
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
 
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

FileSys.copy = function(src, dst) {//文件复制
  fs.writeFileSync(dst, fs.readFileSync(src));
}

FileSys.Write2File = function(path,data) {//文件写入
  fs.writeFileSync(path, data);
}



module.exports = FileSys;
