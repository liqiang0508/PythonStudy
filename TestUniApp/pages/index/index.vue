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
			<view class="kind_item" @tap="KindsTap(index)" v-for="(item,index) in kindsData" :key="index">
				<image class="kind_img" src="../../static/logo.png"></image>
				<text class="kind_txt">{{item.name}}</text>
			</view>

		</view>

		<hr />

		<!-- 公告 -->
		<view class="notice">
			<uni-icons type="info"></uni-icons>
			<text class="notice_text">公告</text>
			<view class="_notice">
				<text :animation="animationData" class="ScrollText notice_text">666</text>
			</view>

			<text class="notice_text_right">></text>

		</view>

		<!-- <button @click="anitest">btn</button> -->

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
				animationData: {},
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				kindsData: [{
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

				]
			}
		},
		onLoad() {

		},
		onShow() {
			console.log("show");
			// 初始化一个动画
			var animation = uni.createAnimation({
				duration: 5000,
				
			})
			this.animation = animation
			
			
		},
		onPullDownRefresh() {
			console.log("下拉刷新")
			setTimeout(function() {
				uni.stopPullDownRefresh();
				console.log("停止下拉刷新")
			}, 1000);
		},
		methods: {
			anitest: function() {
				
				const query = uni.createSelectorQuery().in(this);
				query.select('.ScrollText').boundingClientRect(data => {
				  console.log("得到布局位置信息" + JSON.stringify(data));
				  console.log("节点离页面顶部的距离为" + data.top);
				}).exec();
				
				

			},
			KindsTap: function(index) {
				console.log("点击了种类--", index)
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
		margin-left: 15rpx;
		margin-right: 15rpx;
		margin-top: 20rpx;
		/* background-color: #10AEFF; */
		display: flex;
		flex-direction: column;
		justify-items: flex-end;
		align-items: center;
		width: 120rpx;
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
		word-break: keep-all;
	}

	.notice {
		width: 100%;
		height: 55rpx;
		background-color: rgba(255, 0, 0, 0.5);
		/* opacity: 0.5; */
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.notice_text {
		margin-left: 10rpx;
		color: white;

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
		width: 590rpx;
		background: rgba(255, 0, 0, 0.25);
		height: 40rpx;
		border-radius: 6upx;
		overflow: hidden;
		box-sizing: border-box;
		

	}
</style>
