var VersionManager = {}

let HttpHelper = require("./HttpHelper.js")

VersionManager.printlog = function() {
	console.log("VersionManager.printlog*****")
}

VersionManager.checkUpdate = function(url) {
	console.log("VersionManager.checkUpdate*****")
	HttpHelper.HttpGet(url, (data) => {


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
	uni.downloadFile({
		url:url,
		success: (res) => {
			if (res.statusCode === 200) {
				console.log('下载成功');
				this.installWgt(res.tempFilePath)
			}
		},
		fail:(res)=>{
			 console.log('下载失败');
		}

	});

}
//更新安装wgt包
VersionManager.installWgt = function(path) {
	// #ifdef APP-PLUS
	plus.nativeUI.showWaiting();
	plus.runtime.install(path, {}, function() {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件成功！");
		plus.nativeUI.alert("应用资源更新完成！", function() {
			plus.runtime.restart();
		});
	}, function(e) {
		plus.nativeUI.closeWaiting();
		console.log("安装wgt文件失败[" + e.code + "]：" + e.message);
		plus.nativeUI.alert("安装失败[" + e.code + "]：" + e.message);
	});
	// #endif

}

module.exports = VersionManager;
