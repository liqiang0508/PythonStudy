//一些通用的辅助函数
var GlobalFun = {}

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



module.exports = GlobalFun;