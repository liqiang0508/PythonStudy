var VersionManager = {
	progressCall: null,
	finishCall: null
}

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

			} else { //失败
				this.callFinishWithCode(1, "拉取远程配置信息失败")
			}

		})


}
//显示更新弹框
VersionManager.showUpdateModule = function(content, openUrl) {
	uni.showModal({
		title: '更新提示',
		content: content ? content : '是否选择更新',
		success: (showResult) => {
			if (showResult.confirm) {
				plus.runtime.openURL(openUrl);
			}
		}
	})
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
		console.og('已下载' + res.progress + '%');
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
