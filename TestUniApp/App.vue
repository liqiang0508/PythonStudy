<script>
	import HttpHelper from "common/HttpHelper.js"
	import VersionManager from "common/VersionManager.js"
	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var url = "http://192.168.65.172/hotupversion/uniconfigrelease"
			//#ifdef APP-PLUS 
				VersionManager.checkUpdate(url,(res)=>{
					var percent = res.progress//进度
					console.log("下载进度=",percent)
				},(code)=>{
					console.log("更新结束返回code ===",code)
				})
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
