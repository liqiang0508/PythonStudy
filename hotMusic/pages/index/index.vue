<template>
	<view class="content">

		<view>
			<image class="imgUrl" mode="aspectFit" :src="soundData.picurl"></image>
			<view class="player">
				<text style="color: #ff0000;"> {{ soundData.name }}</text>
				<view style="height: 10rpx;">

				</view>
				<text style="color: #1AAD19; font-size: 20px;"> {{ soundData.artistsname }}</text>
			</view>
			<view style="height: 20rpx;">

			</view>

			<view class="control">


				<button size="mini" v-if="isplaying" type="primary" @tap="playSound">暂停</button>
				<button size="mini" v-if="isplaying==false" type="primary" @tap="playSound">播放</button>
				<button size="mini" type="primary" @tap="nextSound">下一曲</button>
			</view>

		</view>

	</view>
</template>

<script>
	import HttpHelper from "../../common/HttpHelper.js"
	import UiManager from "../../common/UiManager.js"
	// https://blog.csdn.net/qq_44275213/article/details/107357972 接口
	export default {
		data() {
			return {
				title: 'Hello',
				soundData: {
					name: "",
					url: "",
					picurl: "",
					artistsname: ""
				},
				isplaying: false
			}
		},
		onLoad() {
			this.stop()
			console.log("onLoad");
			this.innerAudioContext = uni.createInnerAudioContext();
			// innerAudioContext.autoplay = true;
			// innerAudioContext.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
			this.innerAudioContext.onPlay(() => {
				console.log('开始播放');
			});
			this.innerAudioContext.onError((res) => {
				console.log(res.errMsg);
				console.log(res.errCode);
				this.nextSound()
			});
			this.innerAudioContext.onEnded((res) => {
				this.nextSound()
			});
			this.getSoundData()
		},
		onShow() {

			
		},
		onUnload() {
			this.stop()
		},
		methods: {
			stop() {
				if (this.innerAudioContext) {
					this.innerAudioContext.pause()
					this.isplaying = false

				}
			},

			playSound() {
				console.log("播放");
				if (this.isplaying) {
					this.innerAudioContext.pause()
				} else {
					this.innerAudioContext.play()
				}
				this.isplaying = !this.isplaying
			},
			nextSound() {
				console.log("下一曲");
				this.getSoundData()
			},
			getSoundData() {
				UiManager.showloading()
				var url = "https://api.uomg.com/api/rand.music?sort=热歌榜&format=json"
				HttpHelper.HttpGet(url, (res) => {
					UiManager.hideloading()
					if (res.data.code == 1) {

						this.soundData = res.data.data
						console.log(this.innerAudioContext);
						this.innerAudioContext.src = this.soundData.url
						this.innerAudioContext.play()
						this.isplaying = true

					}
				})
			}
		}
	}
</script>

<style>
	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

	}

	.player {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.control {
		width: 100%;
		display: flex;
		flex-direction: row;
		/* align-items: center; */
	}
</style>
