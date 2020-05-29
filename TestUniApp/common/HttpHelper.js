function httpGet(url, call) {

	uni.request({
		url: url, //仅为示例，并非真实接口地址。

		success: (res) => {

			if(call)
			{
				call(res.data)
			}

		},
		fail: () => {
			call(null)
		}
	});

}

module.exports = {
	HttpGet:httpGet
}