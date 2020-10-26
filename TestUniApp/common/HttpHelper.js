function httpGet(url, call) {

	uni.request({
		url: url, //仅为示例，并非真实接口地址。
		sslVerify: false,
		method: "GET",
		timeout:3000,
		success: (res) => {

			if (call) {
				call(res.data)
			}

		},
		fail: (e) => {
			console.log("httpGet error", url, e);
			call(null)
		}

	});

}

function httpPost(url, data, call) {

	uni.request({
		url: url, //仅为示例，并非真实接口地址。
		sslVerify: false,
		method: "POST",
		timeout:3000,
		data: data,
		header: {
			'content-type': 'application/json' //json
		},
		success: (res) => {

			if (call) {
				call(res.data)
			}

		},
		fail: (e) => {
			console.log("httpPost error", url, e);
			call(null)
		}

	});
}
module.exports = {
	HttpGet: httpGet,
	httpPost: httpPost
}
