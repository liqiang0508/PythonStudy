<template>
	<view>
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

		<button @click="open">打开弹窗</button>
		<!-- <uni-popup ref="popup" type="bottom">底部弹出 Popup</uni-popup> -->


		<view v-if="popshow" class="popup" @click="hidepop">
			<view class="popbg">
				<text style="margin-top: 25rpx; margin-left: 250rpx;"></text>
			</view>
		</view>



	</view>
</template>

<script>
	// import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			// uniPopup
		},
		data() {
			return {
				popshow: true,
				isAllSelect: false,
				totalmoney: 0,
				dataList: [{}, {}]
			}
		},
		methods: {
			open() {
				this.popshow = true
			},
			hidepop() {
				this.popshow = false
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
			}
		}
	}
</script>

<style>
	.popup {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.popbg{
		text-align: center;
		display: flex;
		
		width: 600rpx;
		height: 400rpx;
		border-radius: 25rpx;
		background-color: rgb(255, 255, 255);
	}

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
