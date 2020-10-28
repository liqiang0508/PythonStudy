var UiManager = {}



// 显示弹框
UiManager.ShowAlert = function (title,btninfos,str,call){
	
		uni.showModal({
			title: title?title:"提示",
			content: str,
			showCancel:btninfos.length>=2,
			confirmText:btninfos[0]==""?"确认":btninfos[0],
			cancelText:btninfos[1]==""?"取消":btninfos[1],
			success: function(res) {
				if (res.confirm) {
					if(call	)
					{
						call(1)
					}
				} else if (res.cancel) {
					if(call	)
					{
						call(0)
					}
				}
			}
		});
}


//显示loading
UiManager.showloading = function (title)
{
	title = title?title:"加载中"
	uni.showLoading({
	    title: title,
		mask:true
	});
}
//隐藏loading
UiManager.hideloading = function ()
{
	uni.hideLoading()
}

//显示toast
UiManager.showtoast = function (str,time)
{	
	time = time?time:2000
	uni.showToast({
	    title: str,
	    duration: time
	});
}

module.exports = UiManager;