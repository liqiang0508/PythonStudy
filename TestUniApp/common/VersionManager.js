var VersionManager = {
	progressCall: null,
	finishCall: null
}

String.prototype.format = function() {
	return [...arguments].reduce((p, c) => p.replace(/%s/, c), this);
};

let HttpHelper = require("./HttpHelper.js")
let GlobalFun = require("./GlobalFun.js")

VersionManager.printlog = function() {
	console.log("VersionManager.printlog*****")

}
VersionManager.callFinishWithCode = function(code, message) {
	console.log(message)
	if (this.finishCall) {
		this.finishCall(code)
	}
}
// code
// 0 更新成功
// 100 不需要更新
// 101 更新成功

// 1 拉取远程配置信息失败
// 2 下载远程wgt失败
// 3 install wgt失败
// 4 2进制版本不支持热更新
VersionManager.checkUpdate = function(url, progressCall, finishCall) {
	console.log("VersionManager.checkUpdate*****")
	this.progressCall = progressCall
	this.finishCall = finishCall,
	
	HttpHelper.HttpGet(url, (data) => {
		if (data) //拿到配置数据了
		{
			this.remoteData = data; //保存下远程配置
			console.log(data)
			if (this.forceUpdate())//判断是否属于强制更新的版本
			{
				console.log("强制更新")
				this.showUpdateModule("发现新版本","https://www.baidu.com/")
			}else//热更新
			{
				console.log("走热更新流程")
				if(this.binCheck())
				{
					this.compare()
				}
				else
				{
					this.callFinishWithCode(4, "2进制版本不支持热更新")
				}
				
			}
			
		} else { //失败
			this.callFinishWithCode(1, "拉取远程配置信息失败")
		}

	})


}
//2进制版本对比，判断当前版本是否是强制更新版本
VersionManager.forceUpdate  = function() {
	console.log("检测是否强制更新****")
	
	var curVersion = plus.runtime.version//当前版本号
	console.log("当前2进制版本 == ",curVersion)
	var b = GlobalFun.isContain(curVersion,this.remoteData["forcedBinaryVersions"])
	if (b)
	{
		return true
	}
	return false
	
}

//2进制版本对比，判断当前版本是否支持热更新
VersionManager.binCheck  = function() {
	console.log("检测是否支持热更新****")
	var curVersion = plus.runtime.version//当前版本号
	var b = GlobalFun.isContain(curVersion,this.remoteData["supportBinarys"])
	if (b)
	{
		return true
	}
	return false
	
}
//本地版本号
VersionManager.getLocalVersion = function() {
	var value = GlobalFun.scriptVersion
	try {

		value = uni.getStorageSync("storage_key");
		if (value) {

		} else {
			value =  GlobalFun.scriptVersion
		}
		return value
	} catch (e) {
		// error
		console.log("getLocalVersion错误")
		return value
	}


}

//对比版本
VersionManager.compare = function() {
	console.log("VersionManager.compare*****")
	var remoteScritVersion = this.remoteData["scriptVersion"]
	var localVersion = this.getLocalVersion()
	console.log("远程版本号===", remoteScritVersion)
	console.log("本地版本号===", localVersion)
	if (Number(remoteScritVersion) != Number(localVersion)) {
		var wgturl = (this.remoteData["baseUrl"]).format(remoteScritVersion) + ".wgt"
		console.log("需要更新", wgturl)
		this.downWgt(wgturl)
	} else {
		this.callFinishWithCode(100, "不需要更新")

	}

}
//强制更新弹框
VersionManager.showUpdateModule = function(content, openUrl) {

	plus.nativeUI.alert(content, () => {
		plus.runtime.openURL(openUrl);
		// plus.runtime.quit()
	});
}


VersionManager.downWgt = function(url) {

	const downloadTask = uni.downloadFile({
		url: url,
		success: (res) => {
			if (res.statusCode === 200) {
				console.log('下载成功');
				this.installWgt(res.tempFilePath)
			}
		},
		fail: (res) => {
			console.log('下载失败');
			this.callFinishWithCode(2, "下载远程wgt失败")
		}

	});
	downloadTask.onProgressUpdate((res)=>{
		// console.log('已下载' + res.progress + '%');
		if (this.progressCall) {
			this.progressCall(res)
		}

	})



}
//更新安装wgt包
VersionManager.installWgt = function(path) {
	// #ifdef APP-PLUS

	plus.nativeUI.showWaiting();
	plus.runtime.install(path, {}, () => {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		var remoteScritVersion = this.remoteData["scriptVersion"]
		uni.setStorageSync('storage_key', remoteScritVersion.toString())
		this.callFinishWithCode(101, "更新成功")
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		// plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
		this.callFinishWithCode(3, "install wgt失败")
	});
	// #endif

}

//重启app
VersionManager.restartApp = function() {

	plus.runtime.restart();
}


module.exports = VersionManager;
