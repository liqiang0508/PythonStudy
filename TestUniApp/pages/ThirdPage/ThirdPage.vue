<template>
	<view>
		<view>
			<web-view :webview-styles="webviewStyles" src="https://www.baidu.com/"></web-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#ff011a'
					}
				}
			}
		},
		onReady() {
			// uni.getLocation({
			//     type: 'gcj02',
			// 	geocode:true,
			//     success: function (res) {
			//         console.log('当前位置的经度：' + res.longitude);
			//         console.log('当前位置的纬度：' + res.latitude);
			// 		console.log('当前位置的纬度：' + res.address);
			//     }
			// });

			// uni.chooseLocation({
			//     success: function (res) {
			//         console.log('位置名称：' + res.name);
			//         console.log('详细地址：' + res.address);
			//         console.log('纬度：' + res.latitude);
			//         console.log('经度：' + res.longitude);
			//     }
			// });
		},
		methods: {

		}
	}
</script>

<style>

</style>
