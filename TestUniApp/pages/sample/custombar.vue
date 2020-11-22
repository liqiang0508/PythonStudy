<template>
	<view class="page">
		<video class="video" id="demoVideo" 
		:controls="true" 
		webkit-playsinline="" ﻿
		playsinline="" 
		x5-video-player-type="h5"
	    src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v">
			<cover-view class="topview controls-title">
				<text @click="textclick">我是视频上的文字</text>
			</cover-view>
			<cover-image class="topview controls-img" src="/static/logo.png" @click="imgclick"></cover-image>
		</video>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.videoCtx = uni.createVideoContext('demoVideo')
		},
		methods: {
			imgclick(){
				alert("img click")
			},
			textclick()
			{
				alert("textclick click")
			}
		}
	}
</script>
<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.video {
		position: relative;
	}

	
	 .topview{
		display: inline-block;
		z-index: 999999;
	}


	.controls-title {
		width: 100%;
		text-align: left;
		color: #ffa30f;
		position: absolute;
		bottom:40px;



	}
	.controls-img{
		position: absolute;
		width: 50px;
		height: 50px;
		right: 5px;
		bottom:40px;
	}
</style>
