<template>
	<view class="content">

		<view style="display: flex;flex-direction: column;align-items: center;">

			<image class="imgUrl" mode="aspectFit" :src="soundData.picurl"></image>

			<view class="player">
				<text style="color: #ff0000;"> {{ soundData.name }}</text>
				<text> - </text>
				<text style="color: #1AAD19; font-size: 20px;"> {{ soundData.artistsname }}</text>
			</view>

			<view style="height: 20rpx;">
			</view>

			<bing-lyric :lyrics="lyrics" :centerStyle="centerStyle" :curTime="curTime" :areaStyle="cuAreaStyle" :lyricStyle="lyricStyle"
			 @centerBtnClick="centerBtnClick" @copyLyrics="copy">
			</bing-lyric>

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
	import bingLyric from '../../components/bing-lyric/bing-lyric.vue'
	// https://blog.csdn.net/qq_44275213/article/details/107357972 接口
	export default {
		components: {
			bingLyric
		},
		data() {
			return {
				soundData: {
					name: "",
					url: "",
					picurl: "",
					artistsname: ""
				},
				isplaying: false,
				centerStyle: {
					btnImg: '../../static/btn.png',
				},
				cuAreaStyle: {
					width: '100vw',
					height: "300px"
				},
				lyricStyle: {},
				lyrics: [],
				curTime: 0
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
			// var  url = "http://music.163.com/api/song/media?id=" + 6666
			// console.log("url=",url);
			// var id = url.match("id=(\\d+)")
			// console.log("id1=",id);
		
		},

		onUnload() {
			this.stop()
			this.stopTime()
		},
		methods: {


			makeTime() {

				this.TimeFuc = setInterval(() => {
					this.out()
				}, 500)
			},
			stopTime(){
				if (this.TimeFuc) {
					clearInterval(this.TimeFuc)
					this.curTime = 0
					this.lyrics = []
				}
			},
			out(t) {

				this.curTime += 0.5
			},
			copy(e) {
				console.log('index', e)
				uni.showModal({
					content: JSON.stringify(e.lyrics)
				})
			},
			centerBtnClick(e) {
				console.log(e)
				this.curTime = e.centerTime
				this.innerAudioContext.seek(this.curTime)
			},
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
				this.stopTime()
				this.getSoundData()
			},

			getMusicId(musicUrl) {
				var id = 0
				var id = musicUrl.match("id=(\\d+)")
				id = id[1]

				return id

			},
			getMusiclyric(musicid) {
				var url = "http://music.163.com/api/song/media?id=" + musicid
				console.log("getMusiclyric",url);
				HttpHelper.HttpGet(url, (res) => {
					console.log("歌词",res);
					if(res)
					{
						var lyricsArray = res.lyric.split("\n")
						this.lyrics = lyricsArray
						this.makeTime()
					}
					

				})
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
						var id = this.getMusicId(this.soundData.url)
						if (id > 0) {
							this.getMusiclyric(id)
						}

					}
				})
			}
		}
	}
</script>

<style>
	@-webkit-keyframes imgRotate {
		0% {
			transform: rotate(0deg)
		}

		50% {
			transform: rotate(180deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

	@keyframes imgRotate {
		0% {
			transform: rotate(0deg)
		}

		50% {
			transform: rotate(180deg)
		}

		100% {
			transform: rotate(360deg)
		}
	}

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
		flex-direction: row;
		align-items: center;
		justify-content: center;

	}

	.imgUrl {

		width: 250rpx;
		height: 250rpx;
		border-radius: 125px;
		animation: imgRotate 5s infinite;
		animation-timing-function:linear

	}

	.control {
		width: 100%;
		display: flex;
		flex-direction: row;
		/* align-items: center; */
	}
</style>
