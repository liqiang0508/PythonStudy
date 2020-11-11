<script>
	import HttpHelper from "common/HttpHelper.js"

	
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let platform = '';
			var sysInfo = uni.getSystemInfoSync()
			
			// #ifdef APP-PLUS
				platform = 'App';
				if (sysInfo.platform == 'android') {
					uni.setStorageSync('isAndroid', true);
				} else {
					uni.setStorageSync('isAndroid', false);
				}
				console.log('CustomBar=='+Vue.prototype.CustomBar)
			// #endif
			
			uni.setStorageSync('platform', platform);
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
	  @import "colorui/main.css";
	  @import "colorui/icon.css";
	  @keyframes show {
	  	0% {
	  		transform: translateY(-50px);
	  	}
	  
	  	60% {
	  		transform: translateY(40upx);
	  	}
	  
	  	100% {
	  		transform: translateY(0px);
	  	}
	  }
	  
	  @-webkit-keyframes show {
	  	0% {
	  		transform: translateY(-50px);
	  	}
	  
	  	60% {
	  		transform: translateY(40upx);
	  	}
	  
	  	100% {
	  		transform: translateY(0px);
	  	}
	  }
</style>
