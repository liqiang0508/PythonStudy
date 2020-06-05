<template>
	<view>
		<view>
		      <view class="status_bar">
		          <!-- 这里是状态栏 -->
				
		      </view>
		      <view> 状态栏下的文字 </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		onNavigationBarButtonTap(e){
			console.log("88888",e)
		},
		methods: {
			
		}
	}
</script>

<style>
 .status_bar {
      height: var(--status-bar-height);
      width: 100%;
  }
</style>
