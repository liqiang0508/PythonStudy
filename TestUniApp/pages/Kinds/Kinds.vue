<template>
	<view class="appkinds uni-flex uni-row">
		<view class="leftView">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="item_left" :class="{active: item.id === current.id}" v-for="item in itemData" :key="item.id" @click="changeCate(item)">
					<text :class="{active: item.id === current.id}">{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
		
		<view class="rightView">
			<scroll-view class="r_scrollview" scroll-y @scrolltoupper="rightupper" @scrolltolower="rightlower" @scroll="rightscroll">
				<view class="right_wrap">
					<view class="item_right" v-for="item in current.child" :key="item.id" @click="chooseitem(item)">
						<image class="item_img"  :src="item.img" mode="aspectFill"></image>
						<text>{{ item.name }}</text>
					</view>

				</view>

			</scroll-view>



		</view>
	</view>
</template>

<script>
	let UiManager = require("../../common/UiManager.js")
	export default {
		
		
		data() {
			return {
				current: {}, //当前选择的数据
				itemData: [ //所有商品数据
					{
						name: "种类1",
						id: 1,
						child: [{
								name: "种类1_1",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 11
							},
							{
								name: "种类1_2",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 12
							},
							{
								name: "种类1_3",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 13
							},
							{
								name: "种类1_4",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 14
							},
							{
								name: "种类1_5",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 15
							},
							{
								name: "种类1_6",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 16
							},
							{
								name: "种类1_7",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 17
							},
							{
								name: "种类1_8",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 18
							},
							{
								name: "种类1_9",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 19
							},
							{
								name: "种类1_20",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 20
							},
							{
								name: "种类1_21",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 21
							},
							{
								name: "种类1_22",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 22
							},
							{
								name: "种类1_23",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 23
							},
							{
								name: "种类1_24",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 24
							},
							{
								name: "种类1_25",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 25
							},
							{
								name: "种类1_26",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 26
							},
							{
								name: "种类1_27",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 27
							},
							{
								name: "种类1_28",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 28
							},
							{
								name: "种类1_29",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 29
							},
							{
								name: "种类1_30",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 30
							},
							{
								name: "种类1_31",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 31
							},
							{
								name: "种类1_32",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 32
							},
							{
								name: "种类1_33",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 33
							},
							{
								name: "种类1_34",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 34
							},
							{
								name: "种类1_35",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 35
							},
							{
								name: "种类1_36",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 36
							},
							{
								name: "种类1_37",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 37
							},
							{
								name: "种类1_38",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 38
							},
							{
								name: "种类1_39",
								img: "https://img14.360buyimg.com/n7/jfs/t1/50975/30/15545/168609/5dc985c4E06e8dbda/032be1072bde8b82.jpg",
								id: 39
							}
			

						]
					},
					{
						name: "种类2",
						id: 2
					},
					{
						name: "种类3",
						id: 3
					},
					{
						name: "种类4",
						id: 4
					},
					{
						name: "种类5",
						id: 5
					},
					{
						name: "种类6",
						id: 6
					},
					{
						name: "种类7",
						id: 7
					}

				]
			}

		},
		onLoad() {
			console.log("onLoad");
			this.current = this.itemData[0]
		},
		onReady() {
			console.log("onReady");
		},
		onShow() {
			console.log("onShow");
		},
		onHide() {
			console.log("onHide");
		},

		methods: {
			upper: function(e) {
				console.log("滚动到顶部/左边，会触发 scrolltoupper 事件")
			},
			lower: function(e) {
				console.log("滚动到底部/右边，会触发 scrolltolower 事件")
			},
			scroll: function(e) {
				// console.log(e)
				//滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}

			},
			rightupper: function(e) {
				console.log("滚动到顶部/左边，会触发 scrolltoupper 事件")
			},
			rightlower: function(e) {
				console.log("滚动到底部/右边，会触发 scrolltolower 事件")
			},
			rightscroll: function(e) {
				// console.log(e)
				//滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
			
			},
			changeCate(item) {
				console.log("当前选择的" + item.name)
				this.current = item;
				UiManager.showtoast("changeCate ="+item.name)
			},
			chooseitem(item) {
				console.log("chooseitem" + item.name)
				UiManager.showtoast("chooseitem = "+item.name)
			}
		}
	}
</script>

<style>
	.appkinds {
		position: absolute;
		opacity: /* 0.5 */;
		width: 100%;
		height: 100%;

	}

	.leftView {
		width: 160rpx;
		height: 100%;
		display: flex;
		background-color: #e2e2e2;
	}
	

	
	.item_left {
		height: 80rpx;
		width: 100%;
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: center;	
	}

	.active {
		background-color: #ffffff;
		color: #00aaff;
		border-radius: 12px 0 0 12px;
	}

	/* 右边 */
	.rightView {
		flex: 1;
		display: flex;
		height: 100%;
		flex-direction: row;
		flex-wrap: wrap;

	}

	.right_wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		width: 100%;
		margin-bottom: 25rpx;
		/* background-color: #00aaff; */


	}

	.r_scrollview {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-content: center;
		width: 100%;
		height: 100%;
		/* background-color: #008000; */
	}

	.item_right {
		margin-top: 15rpx;
		margin-left: 15rpx;
		flex-direction: column;
		align-items: center;
		display: flex;
		width: 30%;
		height: 250rpx;
		/* background-color: #ff0000; */
	}
	
	.item_img{
		width: 100%; 
		height: 100px;
	}
</style>
