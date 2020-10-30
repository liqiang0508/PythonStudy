<template>
	<view>
		<view>
			<view class="status_bar">
				<!-- 这里是状态栏 -->

			</view>
			<view> 状态栏下的文字 </view>

			<view class="uni-row  uni-flex" style="background-color: #000080;">
				<view class="centertext" style="flex: 1; height:100px; background-color: #6d0080;">
					<text>test1</text>
				</view>

				<view class="centertext" style="flex: 1; height:100px; background-color: #800002;">
					<text>test1</text>
				</view>

				<view class="centertext" style="flex: 1;height:100px; background-color: #7d7380;">
					<text>test1</text>
				</view>

				
			</view>
			<button @click="gothird" size="mini" type="primary"><text>go third</text></button>
		</view>
	</view>
</template>

<script>
	let UiManager = require("../../common/UiManager.js")
	export default {
		data() {
			return {
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						cuIcon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						cuIcon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						cuIcon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						cuIcon: 'cuIcon'
					},
					{
						title: '按钮',
						name: 'button',
						color: 'pink',
						cuIcon: 'btn'
					},
					{
						title: '标签',
						name: 'tag',
						color: 'brown',
						cuIcon: 'tagfill'
					},
					{
						title: '头像',
						name: 'avatar',
						color: 'red',
						cuIcon: 'myfill'
					},
					{
						title: '进度条',
						name: 'progress',
						color: 'orange',
						cuIcon: 'icloading'
					},
					{
						title: '边框阴影',
						name: 'shadow',
						color: 'olive',
						cuIcon: 'copy'
					},
					{
						title: '加载',
						name: 'loading',
						color: 'green',
						cuIcon: 'loading2'
					}
				]
			}
		},

		onNavigationBarButtonTap(e) {
			console.log("88888", e)
		},
		methods: {
				gothird:function(){
					console.log("gothird");
					// uni.navigateTo({
					// 	url:"../ThirdPage/ThirdPage"
					// })
					UiManager.navigateTo({
						url:"../ThirdPage/ThirdPage"
					})
				}
		}
	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
	.centertext{//文字居中
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
