<template>
	<view class="content">
		<!-- <scroll-view style="height: 600rpx;" scroll-y="true" scroll-with-animation = "true"> -->
		<view class="row">
			<button type="primary" plain="true" @click="back">PlaySound</button>
			<button type="primary" plain="true" @click="HttpGet">httpGet</button>
			<button type="primary" plain="true">btn3</button>
			<button type="primary" plain="true">btn4</button>
			<button type="primary" plain="true">btn5</button>
			<!-- <image src="../../static/logo.png"></image> -->
		</view>
		<view style="text-align: center;">
			<text>Hello World</text>
		</view>

		<!-- </scroll-view> -->

	</view>
</template>

<script>
	import helper from "../../common/helper.js"
	import HttpHelper from "../../common/HttpHelper.js"
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {
			back: function() {
				// uni.navigateBack()
				// helper.SayHello()
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
				innerAudioContext.autoplay = true
				console.log(helper.GetPaltform())
				// #ifdef APP-PLUS
				console.log("H5")
				//  #endif
			},

			HttpGet: function() {
				// uni.request({
				//     url: 'http://pokerofroyal.com:8080/a/thaitexashotupiii/configrelease', //仅为示例，并非真实接口地址。
				   
				//     success: (res) => {
				       
				// 		console.log("scriptVersion=="+res.data["scriptVersion"])
				        
				//     },
				// 	fail: () => {
						
				// 	}
				// });
				var url = "http://pokerofroyal.com:8080/a/thaitexashotupiii/configrelease"
				HttpHelper.HttpGet(url,(data)=>{
					if(data)
					{
						console.log("scriptVersion=="+data["scriptVersion"])
					}
				})
	
			}

		}
	}
</script>

<style>
	button {
		width: 200rpx;
		margin: 25rpx;
		text-align: center;
		font-size: 30rpx;

	}

	.mask {
		position: absolute;
		background-color: #000000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;

	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		width: 100%;

		/* background-color: #a64f4c; */


	}

	.content {
		display: flex;
		position: absolute;
		flex-direction: column;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		/* background-color: #f6e4ff; */
	}
</style>
