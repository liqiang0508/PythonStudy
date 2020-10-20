var VersionManager = {
	progressCall: null,
	finishCall: null
}

String.prototype.format = function() {
  return [...arguments].reduce((p,c) => p.replace(/%s/,c), this);
};

let HttpHelper = require("./HttpHelper.js")

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
// 1 拉取远程配置信息失败
// 2 下载远程wgt失败
// 3 install wgt失败
VersionManager.checkUpdate = function(url, progressCall, finishCall) {
	console.log("VersionManager.checkUpdate*****")
	this.progressCall = progressCall
	this.finishCall = finishCall,
		HttpHelper.HttpGet(url, (data) => {
			if (data) //拿到配置数据了
			{
				this.remoteData = data; //保存下远程配置
				console.log(data)
				this.compare()
			} else { //失败
				this.callFinishWithCode(1, "拉取远程配置信息失败")
			}

		})


}
//本地版本号
VersionManager.getLocalVersion = function() {
	var value = 100
	// try {
	//     value= uni.getStorageSync('storage_key');
	//     if (value) {
	//         console.log("getLocalVersion",value);
	//     }
	// } catch (e) {
	//     // error
	// 	console.log("getLocalVersion错误")
	// }

	return value
}

//对比版本
VersionManager.compare = function() {
	console.log("VersionManager.compare*****")
	
	var remoteScritVersion = this.remoteData["scriptVersion"]
	var localVersion = this.getLocalVersion()
	console.log(remoteScritVersion,localVersion)
	if (Number(remoteScritVersion) != Number(localVersion)) {
		console.log("需要更新")
		var wgturl = (this.remoteData["baseUrl"]).format(remoteScritVersion)+".wgt"
		console.log("需要更新1",wgturl)
		this.downWgt(wgturl)
	} else {
		console.log("不需要更新")
		this.callFinishWithCode(100, "不需要更新")
		
	}

}
//强制更新弹框
VersionManager.showUpdateModule = function(content, openUrl) {

	plus.nativeUI.alert("发现新版本，去下载安装！", () => {
		plus.runtime.openURL(openUrl);
		plus.runtime.quit()
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
	downloadTask.onProgressUpdate(function(res) {
		console.log('已下载' + res.progress + '%');
		if (this.progressCall) {
			this.progressCall(res.progress)
		}

	})



}
//更新安装wgt包
VersionManager.installWgt = function(path) {
	// #ifdef APP-PLUS
	plus.nativeUI.showWaiting();
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		var remoteScritVersion = this.remoteData["scriptVersion"]
		// uni.setStorageSync('storage_key',remoteScritVersion.toString())
		// console.log(uni.getStorageSync('storage_key')) 
		plus.nativeUI.alert("应用资源更新完成！", () => {
			this.restartApp()
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
		this.callFinishWithCode(3, "install wgt失败")
	});
	// #endif

}

//重启app
VersionManager.restartApp = function() {

	plus.runtime.restart();
}


module.exports = VersionManager;
