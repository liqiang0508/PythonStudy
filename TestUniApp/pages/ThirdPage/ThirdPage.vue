<template>
	<view>
		<view>
			<web-view :webview-styles="webviewStyles" :src="siteurl"></web-view>
		</view>
	</view>
</template>

<script>
	import utils from  "../../common/utils.js"
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#ff011a'
					}
				},
				siteurl:""
			}
		},
		onReady() {
			
		},
		onLoad(option) {
			console.log("打开"+option.siteurl)
			this.siteurl = option.siteurl
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
