<template>
	<view>
		<!-- <text>购物车</text> -->
		
		<view style="height: 800rpx; background-color: #fff2f3;" v-for="(item,index) in dataList" :key="index">
			
		</view>
		<view class="bottom">
			<view class = "left" style="margin-left: 20rpx;">
				<radio  @click="checkboxChange" :value="isAllSelect" :checked ="isAllSelect" />
				<text style="font-size: 20rpx;">全选</text>
				<text style="font-size: 20rpx; color: red; margin-left: 20rpx;">总金额:{{totalmoney}}</text>
			</view>
			
			<view class="right">
					<view class = "btnR uni-bg-blue" @click="onEdit">
						<text>编辑</text>
					</view>
					
					<view class = "btnR uni-bg-red" @click="onSettlement">
						<text>结算</text>
					</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAllSelect:false,
				totalmoney:0,
				dataList:[{},{}]
			}
		},
		methods: {
			dclick: function() {
				console.log("dbclick");
			},
			checkboxChange: function(e) {
				
				 this.isAllSelect = !this.isAllSelect
				 console.log(this.isAllSelect);
			},
			onEdit:function(){
				console.log("编辑");
			},
			
			onSettlement:function(){
				console.log("结算");
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
		bottom: 50px;
		/* background-color: #cc596a; */
		width: 100%;
		height: 40px;
	}
	.right{
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 400rpx;
		height: 100%;
		position: absolute;
		right: 0;
		
	}
	.btnR{
		display: flex;
		width: 200rpx;
		height:100%;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
</style>
