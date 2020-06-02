<template>
	<view class="content">
		<view class="myinfo">
			<view class="myinfo_vertical">
				<image class="avator" src="../../static/logo.png" mode="scaleToFill"></image>
				 <view class="myinfo_name">
						<text>{{userName}}</text>
						<image class="avator"  style="width: 50px; height: 10px;" src="../../static/logo.png" mode="scaleToFill"></image>
				 </view>
				 <view class="addres">
					  <image style="width: 50rpx; height: 50rpx; margin-left: 15rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					  <text style="color: #ffffff; margin-left: 25rpx;">收货地址</text>
				 </view>
			</view>
			
		</view>
		<!-- 钱包积分 -->
		<view class="MJ">
			<view class="money">
				<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
				<text>我的钱包</text>
			</view>
			
			<view class="money">
				<text>0</text>
				<text>积分</text>
			</view>
		</view>
		
		<view style = "width:100%; height:20rpx; background-color: rgba(0,0,0,0.3);"></view>
		
		<view class = "myoder">
			<text style="margin-left:20rpx;">我的订单</text>
		</view>
		
		<hr/>
		
		<view class="orderinfos">
				<view class="orderinfo">
					<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					<text>待付款</text>
				</view>
				
				<view class="orderinfo">
					<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					<text>待发货</text>
				</view>
				
				<view class="orderinfo">
					<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					<text>待收货</text>
				</view>
				
				<view class="orderinfo">
					<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					<text>已完成</text>
				</view>
				
				<view class="orderinfo">
					<image style="width: 50rpx; height: 50rpx;" src="../../static/logo.png" mode="scaleToFill"></image>
					<text>售后</text>
				</view>
		</view>
		
		<view style = "width:100%; height:20rpx; background-color: rgba(0,0,0,0.3);"></view>
		<!-- <view v-if="listData.length>0">
			<text>LOl</text>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName:"断了的弦的小同学",
				listData:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.myinfo{
		width: 100%;
		height: 350rpx;
		background-color: #ffaa00;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.myinfo_vertical{
		width: 100%;
		height: 150rpx;
		/* background-color: #0062CC; */
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.avator{
		width: 128rpx;
		height: 128rpx;
	}
	.myinfo_name{
		height: 80%;
		display: flex;
		flex-direction: column;
		/* background-color: #10AEFF; */
		justify-content: space-around;
		align-items: center;
		margin-left: 20rpx;
	}
	
	.addres{
		background-color: #ff0000;
		right: 0rpx;
		position: absolute;
		
		width: 210rpx;
		height: 80rpx;
		border-radius: 80rpx 0 0 80rpx;
		display: flex;
		align-items: center;
	}
	/* 钱包积分 */
	.MJ{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin-top: 10rpx;
		/* background-color: #007AFF; */
	}
	
	.money{
		width:50%;
		height:130rpx;
		text-align: center;
		/* background-color: #55aa00; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	/* 我的订单 */
	.myoder{
		width: 100%;
		height: 90rpx;
		/* background-color: #0062CC; */
		display: flex;
		justify-content: flex-start;
		align-items: center;
		color: rgba(0,0,0,1);
		
	}
	
	.orderinfos{
		width: 100%;
		height: 150rpx;
		/* background-color: #0062CC; */
		display: flex;
		flex-direction: row;
		
	}
	
	.orderinfo{
		width: 20%;
		height: 100%;
		/* background-color: #3F536E; */
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
</style>
