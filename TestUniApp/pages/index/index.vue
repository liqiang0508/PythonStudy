<template>
	<view class="content">

		<!-- 轮播图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<image mode="aspectFit" class="swiperimg" src="../../static/logo.png"></image>
						</swiper-item>
						<swiper-item>

							<image mode="aspectFit" class="swiperimg" src="../../static/logo.png"></image>
						</swiper-item>
						<swiper-item>
							<image mode="aspectFit" class="swiperimg" src="../../static/logo.png"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>

		<hr style=" margin-top: 10rpx" />

		<!-- 种类 -->
		
		<view class="kinds" >
			<view class="kind_item" @tap="KindsTap(index)" v-for="(item,index) in kindsData" :key="index">
				<image class="kind_img" src="../../static/logo.png"></image>
				<text class="kind_txt">{{item.name}}</text>
			</view>
			
		</view>

		<hr/>
		
		<!-- 公告 -->
		<view class="notice">
			<uni-icons type="info"></uni-icons>
			<text class="notice_text">公告</text>
			<text class="notice_text_right">></text>
			
		</view>
		
		
		
	</view>
	</view>
</template>

<script>
	// import Test1 from '@/components/Test1/Test1.vue'
	export default {
		comments: {
			// Test1
		},
		data() {
			return {

				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				kindsData: [
					{
						imgsrc: "../../static/logo.png",
						name: "蔬菜豆制品",
						id:0
					},
					{
						imgsrc: "../../static/logo.png",
						name: "肉类",
						id:1
					},

{
						imgsrc: "../../static/logo.png",
						name: "水产海鲜",
						id:2
					},
					{
						imgsrc: "../../static/logo.png",
						name: "方便速食",
						id:3
					},
					{
						imgsrc: "../../static/logo.png",
						name: "粮油干调",
						id:4
					},
					{
						imgsrc: "../../static/logo.png",
						name: "水果",
						id:5
					},
					{
						imgsrc: "../../static/logo.png",
						name: "西式料理",
						id:6
					},
					{
						imgsrc: "../../static/logo.png",
						name: "禽类",
						id:7
					},
					{
						imgsrc: "../../static/logo.png",
						name: "蛋类",
						id:8
					},
					{
						imgsrc: "../../static/logo.png",
						name: "豆制品",
						id:9
					},

				]
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
			KindsTap:function(index){
				console.log("点击了种类--",index)
			},
			
			

		}
	}
</script>

<style>
	.content {
		position: absolute;
		display: flex;
		width: 100%;
		flex-direction: column;
		justify-content: center;
		left: 0;
		top: 0;
		/* background-color: #000000; */
	}


	.swiper {
		height: 300rpx;
		width: 100%;
		/* background-color: #0062CC; */
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiperimg {
		width: 100%;
		height: 100%;
	}


	.kinds {
		width: 100%;
		/* height: 350rpx; */
		/* background: #cc0000; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: space-between;

	}

	.kind_item {
		margin: 10rpx;
		/* background-color: #10AEFF; */
		display: flex;
		flex-direction: column;
		justify-items: flex-end;
		align-items: center;
		width: 130rpx;
		height: 150rpx;
		text-align: center;
	}

	.kind_img {
		width: 70rpx;
		height: 70rpx;
	}

	.kind_txt {
		margin-top: 10rpx;
		/* width: 80rpx; */
		height: 80rpx;
		word-break:keep-all;
	}
	
	.notice{
		width: 100%;
		height: 55rpx;
		background-color: #ff0000;
		opacity: 0.5;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.notice_text{
		margin-left: 10rpx;
		color: white;
	}
	.notice_text_right{
		position: absolute;
		right: 10rpx;
		color: white;
	}
</style>
