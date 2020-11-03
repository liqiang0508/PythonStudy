<template>
	<view class=content>
		<!-- <text>购物车</text> -->

		<!-- <view style="height: 800rpx; background-color: #fff2f3;" v-for="(item,index) in dataList" :key="index">

		</view> -->




		<view class="bottom">
			<view class="left" style="margin-left: 20rpx;">
				<radio @click="radioChange" :checked="isAllSelect" />
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
		<button class="bg-gradual-orange" @click="open">一个按钮</button>
		<button class="bg-gradual-purple" @click="open2">打开2个按钮</button>
		<button class="bg-red" @click="open3">打开3个按钮</button>
		<!-- <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup> -->
		<test1  name="组件测试" @BtnClick="onTap"></test1>
		<alert ref="alert" @closepop="btnclose"></alert>

		<button class="bg-brown" @click="open4">打开弹窗</button>
		<uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup>
		<button class="bg-blue" @click="open5">打开网页弹框</button>
		<button class="bg-gradual-pink" @click="open6">自定义导航栏</button>


	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import alert from "@/components/alert/alert.vue"
	import test1 from "@/components/Test1/test.vue"
	let UiManager = require("../../common/UiManager.js")
	export default {
		components: {
			uniPopup,
			alert,
			test1
		},
		data() {
			return {
				isAllSelect: false,
				totalmoney: 0,
				dataList: [{}, {}]
			}
		},
		onReady() {
			// uni.showNavigationBarLoading()
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});

		},
		methods: {
			open6(){
				UiManager.navigateTo({url:"../sample/custombar"})
			},
			open5(){
				
				UiManager.navigateTo({url:"../ThirdPage/ThirdPage?siteurl=https://www.baidu.com/"})
			
			},
			onTap(arg) {
				console.log("onTap-----", arg);
				UiManager.showtoast("tosat")
			},
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

				this.$refs.alert.showDialog("提示", "提示xxxxxx22？", ["yes"], function(index) {
					console.log("父节点收到点击事件回调2", index);

				})

				
			},
			open4() {
				this.$refs.popup.open()
				// const subNVue = uni.getSubNVueById('popup')
				// subNVue.show()
				// this.$refs.uniPop.show({
				//     skin: 'toast',
				//     content: 'loading',
				//     icon: 'loading', //success | info | error | loading
				//     shade: false,
				//     time: 3
				// })
			},
			btnclose: function(index) {
				console.log(" parents close---", index);
			},
			dclick: function() {
				console.log("dbclick");
			},
			radioChange: function(e) {

				this.isAllSelect = !this.isAllSelect
				console.log("是否全选", this.isAllSelect);
			},
			onEdit: function() {
				console.log("编辑");
			},

			onSettlement: function() {
				console.log("结算");
				// #ifdef APP-PLUS
				plus.globalEvent.addEventListener('netchange', function() {});
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
