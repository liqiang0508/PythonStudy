<template>
	<view class="content">

		<text class="title">{{title}}</text>

		<button @click="btnClick" type="primary" plain="true">button</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Index'
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log("停止下拉刷新")
			}, 1000);
		},
		methods: {
			btnClick: function() {
				console.log("按钮点击了")
				// uni.showModal({
				//     title: '更新提示',
				//     content: '是否选择更新',
				//     success: (showResult) => {
				//         if (showResult.confirm) {
				//            console.log("999")
				//         }
				//     }
				// })

				uni.navigateTo({
					url: "../Home/Home",
					animationType: "slide-in-left",
					animationDuration: 3000
				})

			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.click {
		background-color: red;
		color: yellow;
	}
</style>
