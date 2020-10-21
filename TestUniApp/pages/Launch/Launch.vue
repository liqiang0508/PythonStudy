<template>
	<view class="content">
		<text>{{ tiptext }}</text>
		<!-- <button @click="tap">6666</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tiptext:"我是提示文字"
			}
		},
		onReady() {
			setTimeout(()=>{
				console.log("跳转")
				uni.switchTab({
					url:"../index/index"
				})
			},3000)
		},
		methods: {
			tap:function(){
				console.log("tap")
				// this.tiptext = new Date().toLocaleTimeString()
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		position: absolute;
		background-color: #ffffff;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		
	}
</style>
