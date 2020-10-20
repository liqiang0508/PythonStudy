<script>
	import HttpHelper from "common/HttpHelper.js"
	import VersionManager from "common/VersionManager.js"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var url = "http://192.168.65.172/hotupversion/uniconfigrelease"
			//#ifdef APP-PLUS 
				VersionManager.checkUpdate(url)
			//#endif
		},
		onShow: function() {
			console.log('App Show')
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	  @import './common/uni.css';
</style>
