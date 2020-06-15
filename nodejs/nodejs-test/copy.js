var fs = require('fs');
var path = require('path');

function copy(src, dst) {
  fs.writeFileSync(dst, fs.readFileSync(src));
}

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
 
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

function copydir(src, dst)//复制文件夹
{

		var exists = fs.existsSync(dst)
		console.log("exists",exists);
		if(!exists)
		{
			fs.mkdirSync(dst);
		}

	 var subpaths = fs.readdirSync(src);
	 for (var i = 0; i < subpaths.length; ++i) {
	 	 if (subpaths[i][0] === '.') {
            continue;
         }
	 	 console.log("subpaths",subpaths[i],i);
	 	 subpath = path.join(src, subpaths[i]);
         stat = fs.statSync(subpath);
         if (stat.isDirectory()) 
         {
            // readDir(subpath, obj);
            fs.mkdirSync(path.join(dst,subpaths[i]));
            console.log("dir");
            copydir(subpath,path.join(dst,subpaths[i]));
         }
         else if (stat.isFile())
         {
         	 copy(subpath,path.join(dst,subpaths[i]));
        	 console.log("file");
         }
	 }
}

copydir('./traval','./traval2');




