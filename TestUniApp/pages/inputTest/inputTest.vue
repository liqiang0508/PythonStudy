<template>
	<view class="content">

		<view class="chat_content">
			<view class="chat_scrollview">
				<view class="chat_item" v-for="item in chatRecords" :key="item.id">
					<view class="head_img">
						<image class="head_img" mode="aspectFit" :src="item.headimg"></image>
					</view>


					<view class="chat_wrap_text">
						<text class="chat_text">{{ item.text }}</text>
					</view>


				</view>
			</view>


		</view>
		
		<view style="height: 40px; background-color: #0000FF;width: 100%;">

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

				]
			}
		},
		onShow() {
			for (var i = 0; i < 25; i++) {
				this.chatRecords.push({
					"id": i,
					"text": i,
					"headimg": "../../static/logo.png",
				})
			}
			this.scrollToBottom()
		},
		methods: {
			scrollToBottom() {
				uni.pageScrollTo({
					scrollTop: 99999,
					duration: 50
				});
			},
			sendText() {

				if (this.text.length < 1) {
					return
				}
				console.log("发送文字" + this.text);
				this.chatRecords[this.chatRecords.length] = {
					"id": this.chatRecords.length + 1,
					"text": this.text,
					"headimg": "../../static/logo.png",
				}
				this.text = ""

				setTimeout(() => {
					this.scrollToBottom()
				}, 50);


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
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 40px;
		background-color: #c8c8c8;
		display: flex;
		align-items: center;

	}

	.inputlElement {
		flex: 1;
		background-color: #ffffff;
		height: 30px;

	}

	.inputBtn {
		display: flex;
		right: 2px;
		margin-left: 5px;

	}

	.chat_item {
		display: flex;
		margin-top: 15px;
		align-items: center;
		/* background-color: #ff1736; */
	}

	.head_img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-left: 1px;
	}

	.chat_wrap_text {
		margin-left: 10px;
		margin-right: 5px;
		background-color: #00aa00;
		border-radius: 5px;
		padding: 10px;
		/* padding-right: 15px; */

	}

	.chat_text {

		word-break: break-all;
		text-align: left;

	}
</style>
