<template>
	<view class=content>
		<!-- <text>购物车</text> -->

		<!-- <view style="height: 800rpx; background-color: #fff2f3;" v-for="(item,index) in dataList" :key="index">

		</view> -->




		<view class="bottom">
			<view class="left" style="margin-left: 20rpx;">
				<radio @click="checkboxChange" :value="isAllSelect" :checked="isAllSelect" />
				<text style="font-size: 20rpx;">全选</text>
				<text style="font-size: 20rpx; color: red; margin-left: 20rpx;">总金额:{{totalmoney}}</text>
			</view>

			<view class="right">
				<view class="btnR uni-bg-blue" @click="onEdit">
					<text>编辑</text>
				</view>

				<view class="btnR uni-bg-red" @click="onSettlement">
					<text>结算</text>
				</view>
			</view>

		</view>
		<button @click="open">一个按钮</button>
		<button @click="open2">打开2个按钮</button>
		<button @click="open3">打开3个按钮</button>
		<!-- <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup> -->

		<alert ref="alert" :popshow=false @closepop="btnclose"></alert>




	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import alert from "@/components/alert/alert.vue"
	import HttpHelper from "../../common/HttpHelper.js"
	export default {
		components: {
			// uniPopup
			alert
		},
		data() {
			return {
				popshow: true,
				isAllSelect: false,
				totalmoney: 0,
				dataList: [{}, {}]
			}
		},
		onReady() {
			// uni.showNavigationBarLoading()
		},
		methods: {
			open2() {
				this.$refs.alert.showDialog("提示", "提示xxxxxx11？", ["yes", "no"], function(index) {
					console.log("父节点收到点击事件回调", index);
				})
			},
			open3() {
				this.$refs.alert.showDialog("提示", "提示xxxxxx11？", ["yes", "no", "middle"], function(index) {
					console.log("父节点收到点击事件回调", index);
				})
			},
			open() {
				// this.$refs.alert.showDialog("提示", "提示xxxxxx22？", ["yes"], function(index) {
				// 	console.log("父节点收到点击事件回调2", index);
				// })
				
				HttpHelper.httpPost("http://192.168.65.172:8080/req", {"name":"liqiang"},(data) => {
				
					if (data) {
						console.log( data)
						
						
					} else {
						
						console.log( "error")
				
					}
				})
			},
			btnclose: function(index) {
				console.log(" parents close---", index);
			},
			dclick: function() {
				console.log("dbclick");
			},
			checkboxChange: function(e) {

				this.isAllSelect = !this.isAllSelect
				console.log(this.isAllSelect);
			},
			onEdit: function() {
				console.log("编辑");
			},

			onSettlement: function() {
				console.log("结算");
				// #ifdef APP-PLUS
					plus.globalEvent.addEventListener('netchange', function(){});
				// #endif
				
			}
		}
	}
</script>

<style>
	.bottom {
		display: flex;
		flex-direction: row;
		align-items: center;
		position: fixed;
		/* bottom: 0;
		left: 0; */
		bottom: var(--window-bottom);
		/* background-color: #cc596a; */
		width: 100%;
		height: 40px;
	}

	.right {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 400rpx;
		height: 100%;
		position: absolute;
		right: 0;

	}

	.btnR {
		display: flex;
		width: 200rpx;
		height: 100%;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	
</style>
