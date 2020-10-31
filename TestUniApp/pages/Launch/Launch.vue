<template>
	<view class="content">

		<text class="tipText">{{ i18n('index').loading  }}</text>

		<view style="height: 20px;"></view>

		<!-- 进度条 -->
		<view style="width: 80%;" class v-if="progress>0">
			<progress :percent="progress" stroke-width="4" />
		</view>

		<!-- //右下角版本文字 -->
		<text class="BRText">{{curVersion}}</text>

	</view>
</template>

<script>
	import VersionManager from "../../common/VersionManager.js"
	let GlobalFun = require("../../common/GlobalFun.js")
	import UiManager from "../../common/UiManager.js"
	export default {
		computed: {
			i18n() {
				return this.$t
			}
		},
		data() {
			return {
				tiptext: "Loading...",
				progress: 0,
				curVersion: 100
			}
		},
		onReady() {
			//多语言
			var item = "en-US"
			this.$i18n.locale = item;
			// #ifdef APP-PLUS
			plus.storage.setItem('locale', item);
			// #endif
			// #ifdef H5
			localStorage.setItem('locale', item);
			// #endif

			this.curVersion = "Version:" + GlobalFun.scriptVersion
			var url = "http://192.168.65.172/hotupversion/uniconfigrelease"
			//#ifdef APP-PLUS 
			this.curVersion = "Version:" + plus.runtime.version + "(" + VersionManager.getLocalVersion() + ")"
			VersionManager.checkUpdate(url, (res) => {
				var percent = res.progress //进度
				var totalBytesWritten = res.totalBytesWritten //已经下载的数据长度，单位 Bytes
				var totalBytesExpectedToWrite = res.totalBytesExpectedToWrite //预期需要下载的数据总长度，单位 Bytes
				console.log("下载进度=", percent)
				this.progress = percent
				this.tiptext = Math.floor(totalBytesWritten / 1024) + "kb/" + Math.floor(totalBytesExpectedToWrite / 1024) + "kb"
			}, (code) => {
				console.log("更新结束返回code ===", code)
				if (code == 100 || code == 4) //100不需要更新，4不支持更新
				{
					this.goMain()
				} else if (code == 101) { //更新成功
					VersionManager.restartApp()
				} else { //some error code
					UiManager.ShowAlert("", ["", ""], "Error code===" + code + " 是否重启?", (res) => {
						if (res == 1) //点击的yes
						{
							VersionManager.restartApp()
						} else //no
						{
							this.goMain()
						}
					})
				}
			})
			//#endif

			// #ifdef H5
			this.goMain()
			// #endif



		},
		onShow() {

		},
		methods: {

			goMain: function() {
				console.log("go index")
				setTimeout(() => {
					uni.switchTab({
						url: "../index/index"
					})
				}, 3000)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		position: absolute;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-image: url('~@/static/splash.png');
		background-size: cover;
		background-position: center;

	}

	/* loading text */
	.tipText {
		font-size: 30rpx;
	}

	/* 右下角 */
	.BRText {
		font-size: 30rpx;
		position: absolute;
		right: 9px;
		bottom: 0rpx;
	}
</style>
