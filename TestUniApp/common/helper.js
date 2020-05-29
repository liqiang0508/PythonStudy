function SayHello() {

	console.log("SayHello")
}

//获取当前平台
function GetPaltform() {
	return uni.getSystemInfoSync().platform
}


module.exports = {
	SayHello: SayHello,
	GetPaltform: GetPaltform,
}
