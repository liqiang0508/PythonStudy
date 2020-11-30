<template>
	<view class="content">

		<view class="chat_content">
			<scroll-view :scroll-into-view="viewIndex" class="chat_scrollview" scroll-y="true" @scrolltoupper="upper"
			 @scrolltolower="lower" @scroll="scroll">
				<view class="chat_item" v-for="item in chatRecords" :key="item.id" @click="changeCate(item)">
					<image class="head_img" mode="aspectFit" :src="item.headimg"></image>
					<text class="chat_text">{{ item.text }}</text>
				</view>
			</scroll-view>
		</view>



		<view class="inputbg">
			<icon type="success" size="26" />
			<input v-model="text" class="inputlElement" placeholder="自动获得焦点"></input>
			<button @click="sendText" class="inputBtn" type="primary" size="mini">发送</button>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				viewIndex: "",
				text: "",
				chatRecords: [
					// {
					// 	"text": 1,
					// 	"headimg": "../../static/logo.png",
					// },
					// {
					// 	"text": 1,
					// 	"headimg": "../../static/logo.png",
					// }
				]
			}
		},
		onShow() {
			// for (var i = 0; i < 25; i++) {
			// 	this.chatRecords.push({
			// 		"id":i,
			// 		"text": i,
			// 		"headimg": "../../static/logo.png",
			// 	})
			// }

		},
		methods: {
			lower(e) {

			},
			upper(e) {

			},
			scrolltolower(e) {

			},
			scroll(e) {

			},
			sendText() {
				console.log("发送文字" + this.text);

				this.chatRecords.push({
					"id":this.chatRecords.length+1,
					"text": this.text,
					"headimg": "../../static/logo.png",
				})
				this.text = ""

				this.viewIndex = "";
				//设置viewIndex值，使聊天滚动到底部  
				this.$nextTick(() => {
					this.viewIndex = "im_" + this.chatList.length;

				})


			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		position: absolute;
		/* background-color: #0062CC; */
		height: 100%;
		width: 100%;
	}

	.chat_content {
		display: flex;
		flex-direction: column;
		/* background-color: #008000; */
		flex: 1;
		height: 100%;
	}

	.chat_scrollview {
		width: 100%;
		height: 100%;
	}

	.inputbg {
		/* position: fixed; */
		bottom: 0;
		width: 100%;
		height: 30px;
		background-color: #c8c8c8;
		display: flex;
		align-items: center;
		/* opacity: 0.1; */
	}

	.inputlElement {
		flex: 1;
		background-color: #ffffff;

	}

	.inputBtn {
		display: flex;
		right: 0px;

	}

	.chat_item {
		display: flex;
		margin-top: 10rpx;
		align-items: center;
		/* background-color: #0000FF; */
	}

	.head_img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}

	.chat_text {
		margin-left: 10px;
	}
</style>
