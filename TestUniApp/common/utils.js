

//获取当前平台
function GetPaltform() {
	return uni.getSystemInfoSync().platform
}

// 显示弹框
function ShowAlert(title,str,call){
	
		uni.showModal({
			title: title,
			content: str,
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
function showloading(title)
{
	title = title?title:"加载中"
	uni.showLoading({
	    title: title,
		mask:true
	});
}
//隐藏loading
function hideloading()
{
	uni.hideLoading()
}
//显示toast
function showtoast(str,time)
{	
	time = time?time:2000
	uni.showToast({
	    title: str,
	    duration: time
	});
}

module.exports = {
	GetPaltform: GetPaltform,
	ShowAlert:ShowAlert,
	ShowLoading:showloading,
	HideLoading:hideloading
}
