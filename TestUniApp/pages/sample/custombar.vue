<template>
	<view>
		<text>自定义导航栏</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			const innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.autoplay = true;
			innerAudioContext.src = 'https://api.uomg.com/api/rand.music?sort=热歌榜';
			innerAudioContext.onPlay(() => {
			  console.log('开始播放');
			});
			innerAudioContext.onError((res) => {
			  console.log(res.errMsg);
			  console.log(res.errCode);
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
