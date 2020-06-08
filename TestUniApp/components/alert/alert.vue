<template>
	<view>
		<view v-if="popshow" class="popup" @click.stop="">
			<view class="popbg" @click.stop="">
				
				<text style="display: block;margin-top: 25rpx;">{{ title }}</text>
				
				<view class="con_str">
				   <text style=" display: block;word-break: break-all;">{{ contentstr }}</text>
		
					
				</view>
				<view class="bottombtns">
					<button v-if  = "this.isDialog"  size = "mini" class="popbtn" @click.stop="clickBtnCall(0)">{{ this.btninfos[0] }}</button>
					<button v-if  = "this.isAlert"  size = "mini" class="popbtn" @click.stop="clickBtnCall(2)">{{ this.btninfos[2] }}</button>
					<button v-if  = "this.isDialog"  size = "mini" class="popbtn" @click.stop="clickBtnCall(1)">{{ this.btninfos[1] }}</button>
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
				title:"",
				isAlert:false,
				isDialog:false,
				btninfos:[]
			}
		},
		props:{popshow: false},
		methods: {
			//显示弹框
			//btninfo 按钮情况 ["yes","no",middle""]
			// 回调 call(0-2)
			showDialog(title,contentstr,btninfo,call) {
				this.title = title
				this.contentstr = contentstr
				this.popshow = true
				this.btnCall = call
				this.btninfos = btninfo
				console.log(this.btninfos)
				console.log(this.btninfos.length);
				if (btninfo.length>2)//3个按钮
				{

					this.isDialog = true
					this.isAlert = true
				}else if(btninfo.length==1)//1个按钮
				{

					this.isDialog = false
					this.isAlert = true
					this.btninfos[2] = btninfo[0]
				}
				else//2个按钮
				{
					console.log("2 btn");
					this.isDialog = true
					this.isAlert = false
				}
				
			},
			
		
			hidepop() {
				this.popshow = false
				
			},
			clickBtnCall(index){
				console.log("clickBtnCall",index)
				// this.$emit("closepop",index);
				this.popshow = false
				if (this.btnCall)
				{
					this.btnCall(index)
				}
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
