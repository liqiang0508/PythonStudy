<template>
	<view class="content">
		<text class="tipText">{{ tiptext }}</text>
		
		<view style="height: 20px;"></view>
		
		
		<view style="width: 80%;" class v-if="progress>0">
			<progress :percent="progress"   stroke-width="4" />
		</view>
		
		
	</view>
</template>

<script>
	import VersionManager from "../../common/VersionManager.js"
	
	export default {
		data() {
			return {
				tiptext: "检查更新",
				progress:0,
			}
		},
		onReady() {
			
			var url = "http://192.168.65.172/hotupversion/uniconfigrelease"
			//#ifdef APP-PLUS 
			VersionManager.checkUpdate(url, (res) => {
				var percent = res.progress //进度
				var totalBytesWritten = res.totalBytesWritten //已经下载的数据长度，单位 Bytes
				var totalBytesExpectedToWrite = res.totalBytesExpectedToWrite //预期需要下载的数据总长度，单位 Bytes
				console.log("下载进度=", percent)
				this.progress = percent
				this.tiptext = Math.floor(totalBytesWritten/1024)+"kb/"+ Math.floor(totalBytesExpectedToWrite/1024)+"kb"
			}, (code) => {
				console.log("更新结束返回code ===", code)
				if (code == 100 || code == 4) //100不需要更新，4不支持更新
				{
					this.goMain()
				}else if(code==101){//更新成功
					VersionManager.restartApp()
				}
				else {
					plus.nativeUI.alert("Error code===" + code, () => {
						VersionManager.restartApp()
					});
				}
			})
			//#endif

		},
		methods: {
			tap: function() {
				console.log("tap")
				// this.tiptext = new Date().toLocaleTimeString()

			},
			goMain: function() {
				console.log("go index")
				setTimeout(()=>{
					uni.switchTab({
						url:"../index/index"
					})
				},3000)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		position: absolute;
		background-color: #ffffff;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;

	}
	.tipText{
		font-size: 30rpx;
	}
</style>
