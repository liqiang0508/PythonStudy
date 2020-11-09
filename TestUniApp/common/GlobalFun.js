//一些通用的辅助函数
var GlobalFun = {}
GlobalFun.scriptVersion = 109;//本地脚本版本号
GlobalFun.LOL = function(){
	console.log("德玛西亚")
}

GlobalFun.isContain = function(str,arr){
	
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].toString()==str)
		{
			return true
		}
	}
	return false
	
}
GlobalFun.getVersionName = function(){
	
	// #ifdef APP-PLUS
	return plus.runtime.versionCode
	// #endif
}
//退出游戏
GlobalFun.exitGame = function(){
	
	// #ifdef APP-NVUE
		plus.runtime.quit()
	// #endif
	
}



module.exports = GlobalFun;