//一些通用的辅助函数
var GlobalFun = {}
GlobalFun.scriptVersion = 124;//本地脚本版本号
GlobalFun.HotUpUrl = "http://lee.free.vipnps.vip/unihotUpVersion/uniconfigrelease"//热更新地址

//数组里面是否包含一个字符串
GlobalFun.isContain = function(str,arr){
	
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].toString()==str)
		{
			return true
		}
	}
	return false
	
}
//获取内部版本号
GlobalFun.getVersionName = function(){
	
	// #ifdef APP-PLUS
	return this.scriptVersion //plus.runtime.versionCode
	// #endif
	
	return ""
}

//退出游戏
GlobalFun.exitGame = function(){
	
	// #ifdef APP-NVUE
		plus.runtime.quit()
	// #endif
	
}



module.exports = GlobalFun;
// window.GlobalFun = GlobalFun