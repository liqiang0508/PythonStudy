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

		<view class="kinds">
			<view class="kind_item" @tap="KindsTap(item)" v-for="(item,index) in kindsData" :key="index">
				<image class="kind_img" :src=item.imgsrc></image>
				<text class="kind_txt">{{item.name}}</text>
			</view>

		</view>

		<hr />

		<!-- 公告 -->
		<view class="notice">
			<uni-icons type="info"></uni-icons>
			<text class="notice_text">公告</text>
			<view class="_notice">
				
				<marquee scrollamount = 3 class = "ScrollText" direction="left">{{ScrollText}}</marquee>

			</view>

			<text class="notice_text_right">></text>

		</view>

		<!-- 新品推荐 -->
		<view style="text-align: center;margin-top: 25rpx; font-size: 30rpx;">
			<text>新品推荐</text>
		</view>

		<view class="new_goods">

			<view @tap="NewGoosTap(item)" class="new_goods_item" v-for="(item,index) in newGoodsData" :key="index">
				<image mode="aspectFit" class="new_goods_img" :src=item.imgsrc></image>
				<text class="new_goods_text">{{item.name}}</text>
				<view class="Price">
					<text style=" font-size: 15px; margin-left: 15rpx;">¥{{item.price}}</text>
					<image @tap.stop="ToShopCar(item)" src="../../static/logo.png" style="margin-right: 15rpx; width: 50rpx; height: 50rpx;"></image>
				</view>
			</view>



		</view>
		
		

		<view style="height:60px;"></view>

	</view>
</template>

<script>
	// import Test1 from '@/components/Test1/Test1.vue'
	import HttpHelper from "../../common/HttpHelper.js"
	import helper from "../../common/utils.js"
	export default {
		comments: {
			// Test1

		},
		data() {
			return {
				animationData: {},
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				ScrollText: "666",
				kindsData: [{ // 种类
						imgsrc: "../../static/logo.png",
						name: "蔬菜豆制品",
						id: 0
					},
					{
						imgsrc: "../../static/logo.png",
						name: "肉类",
						id: 1
					},

					{
						imgsrc: "../../static/logo.png",
						name: "水产海鲜",
						id: 2
					},
					{
						imgsrc: "../../static/logo.png",
						name: "方便速食",
						id: 3
					},
					{
						imgsrc: "../../static/logo.png",
						name: "粮油干调",
						id: 4
					},
					{
						imgsrc: "../../static/logo.png",
						name: "水果",
						id: 5
					},
					{
						imgsrc: "../../static/logo.png",
						name: "西式料理",
						id: 6
					},
					{
						imgsrc: "../../static/logo.png",
						name: "禽类",
						id: 7
					},
					{
						imgsrc: "../../static/logo.png",
						name: "蛋类",
						id: 8
					},
					{
						imgsrc: "../../static/logo.png",
						name: "豆制品",
						id: 9
					}

				],
				newGoodsData: [ //新品推荐数据
					{
						imgsrc: "../../static/logo.png",
						price: 96.5,
						name: "红富士",
						id: 1001
					},
					{
						imgsrc: "../../static/logo.png",
						price: 1,
						name: "红富士1",
						id: 1002
					},

					{
						imgsrc: "../../static/logo.png",
						price: 2,
						name: "红富士2",
						id: 1003
					},
					{
						imgsrc: "../../static/logo.png",
						price: 3,
						name: "红富士4",
						id: 1004
					}


				]
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("show");
			// 初始化一个动画
			this.ScrollText = "果蔬自由-您身边的菜市 快捷服务，配送到家"

		},
		onReady() {
			
		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log("停止下拉刷新")
			}, 1000);
		},
		methods: {
			
			
			NewGoosTap: function(data) {

				console.log("点击了新品推荐--", data.name)
				helper.ShowLoading()
				setTimeout(helper.HideLoading,2000)
			},
			KindsTap: function(data) {
				console.log("点击了种类--", data.name)
				var url = "https://192.168.65.172:5000/hello" //"http://pokerofroyal.com:8080/a/thaitexashotupiii/configrelease"
				HttpHelper.HttpGet(url, (data) => {
				
					if (data) {
						console.log( data[0])
						
						helper.ShowAlert("提示","OK")
					} else {
						
						helper.ShowAlert("提示","EROR")
				
					}
				})
			},
			ToShopCar: function(data) {
				console.log("点击了购物车--", data.name)
			}



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

	.uni-padding-wrap {
		width: 100%;
		padding: 0;
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
		/* background: #cc0000; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: space-between;

	}

	.kind_item {
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 20rpx;
		/* background-color: #10AEFF; */
		display: flex;
		flex-direction: column;
		justify-items: flex-end;
		align-items: center;
		width: 15%;
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
		font-size: 25rpx;
		word-break: keep-all;
	}

	.notice {
		width: 100%;
		height: 55rpx;
		background-color: rgba(255, 0, 0, 0.5);
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.notice_text {
		margin-left: 10rpx;
		color: white;
		font-size: 2rpx;

	}
	/* image:hover{
		opacity: 0.5;
	} */

	.ScrollText {
		/* margin-left: 0px; */
		color: white;
		font-size: 10rpx;
	}

	.notice_text_right {
		position: absolute;
		right: 10rpx;
		color: white;
	}

	._notice {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 15rpx;
		width: 600rpx;
		background: rgba(255, 0, 0, 0.25);
		height: 40rpx;
		border-radius: 6rpx;
		overflow: hidden;
		box-sizing: border-box;

	}

	.new_goods {
		width: 100%;
		/* background: #cc0000; */
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 15rpx;
	}

	.new_goods_item {
		width: 40%;
		height: 500rpx;
		/* background-color: #0062CC; */
		margin-left: 20rpx;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin-top: 10rpx;
	}

	.new_goods_img {
		width: 100%;
		height: 350rpx;
	}

	.new_goods_text {
		margin-top: 10rpx;
		font-size: 38rpx;
	}

	.Price {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		color: rgba(255, 0, 0, 1);
		margin-top: 50rpx;


	}
</style>
