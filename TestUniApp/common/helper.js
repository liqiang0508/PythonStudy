function SayHello() {

	console.log("SayHello")
}

//获取当前平台
function GetPaltform() {
	return uni.getSystemInfoSync().platform
}

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

module.exports = {
	SayHello: SayHello,
	GetPaltform: GetPaltform,
	ShowAlert:ShowAlert
}
