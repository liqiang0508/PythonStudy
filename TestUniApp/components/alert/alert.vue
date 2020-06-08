<template>
	<view>
		<view v-if="popshow" class="popup" @click="hidepop">
			<view class="popbg" @click.stop="">
				
				<text style="display: block;margin-top: 25rpx;">{{ title }}</text>
				
				<view class="con_str">
				   <text style=" display: block;word-break: break-all;">{{ contentstr }}</text>
		
					
				</view>
				<view class="bottombtns">
					<button size = "mini" class="popbtn" @click.stop="clickBtnCall(0)">Yes</button>
					<button size = "mini" class="popbtn" @click.stop="clickBtnCall(1)">Middle</button>
					<button size = "mini" class="popbtn" @click.stop="clickBtnCall(2)">No</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'alert',
		data() {
			return {
				popshow: false,
				contentstr:"",
				title:""
			}
		},
		props:{popshow: false},
		methods: {
			show(title,contentstr) {
				this.title = title
				this.contentstr = contentstr
				this.popshow = true
			},
			hidepop() {
				this.$emit("closepop");
				this.popshow = false
				
			},
			clickBtnCall(index){
				console.log("clickBtnCall",index)
				this.$emit("closepop",index);
				this.popshow = false
			}
		}
	}
</script>

<style>
	
	.popup {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	/* 弹框白色背景 */
	.popbg{
		text-align: center;
		display: flex;
		position:relative ;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		width: 600rpx;
		height: 400rpx; 
		border-radius: 25rpx;
		background-color: rgb(255, 255, 255);
		
	}
	
	.con_str{
		width: 550rpx;
		height: 230rpx;
		/* background-color: #09BB07; */
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		overflow:auto
	}
	.bottombtns{
		width: 100%;
		position: absolute;
		display: flex;
		flex-direction: row;
		bottom: 15rpx;
		/* background-color: #0062CC; */
		
	}
	.popbtn{
		width: 180rpx;
		/* height: 80rpx; */
		text-align: center;
	}
</style>
