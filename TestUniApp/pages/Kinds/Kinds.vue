<template>
	<view class="appkinds uni-flex uni-row">
		<view class="leftView">
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="item_left" :class="{active: item.id === current.id}" v-for="item in itemData" :key="item.id" @click="changeCate(item)">
					<text>{{ item.name }}</text>
				</view>
			</scroll-view>
		</view>
		<view class="rightView">
			<scroll-view class="r_scrollview" scroll-y>
				<view class="right_wrap">
					<view class="item_right" v-for="item in current.child" :key="item.id" @click="chooseitem(item)">
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
								img: "",
								id: 11
							},
							{
								name: "种类1_2",
								img: "",
								id: 12
							},
							{
								name: "种类1_3",
								img: "",
								id: 13
							},
							{
								name: "种类1_4",
								img: "",
								id: 14
							},
							{
								name: "种类1_5",
								img: "",
								id: 15
							},
							{
								name: "种类1_6",
								img: "",
								id: 16
							},
							{
								name: "种类1_7",
								img: "",
								id: 17
							},
							{
								name: "种类1_8",
								img: "",
								id: 18
							},
							{
								name: "种类1_9",
								img: "",
								id: 19
							},
							{
								name: "种类1_20",
								img: "",
								id: 20
							},
							{
								name: "种类1_21",
								img: "",
								id: 21
							},
							{
								name: "种类1_22",
								img: "",
								id: 22
							},
							{
								name: "种类1_23",
								img: "",
								id: 23
							},
							{
								name: "种类1_24",
								img: "",
								id: 24
							},
							{
								name: "种类1_25",
								img: "",
								id: 25
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
					},

				]
			}

		},
		onLoad() {
			this.current = this.itemData[0]
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
			changeCate(item) {
				console.log("当前选择的" + item.name)
				this.current = item;
			},
			chooseitem(item) {
				console.log("chooseitem" + item.name)
			}
		}
	}
</script>

<style>
	.appkinds {
		position: absolute;
		opacity: 0.5;
		width: 100%;
		height: 100%;

	}

	.leftView {
		width: 160rpx;
		height: 100%;
		display: flex;
		background-color: #d8d8d8;
	}

	.item_left {
		/* background-color: #cc1354; */
		height: 80rpx;
		width: 100%;
		/* text-align: center; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.active {
		background-color: #55aaff;
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
		display: flex;
		width: 30%;
		height: 250rpx;
		background-color: #ff0000;
	}
</style>
