<template>
	<view class="content">
		<!-- <scroll-view style="height: 600rpx;" scroll-y="true" scroll-with-animation = "true"> -->
		<view class="row">
			<button type="primary" plain="true" @click="back">PlaySound</button>
			<button type="primary" plain="true" @click="HttpGet">httpGet</button>
			<button type="primary" plain="true">btn3</button>
			<button type="primary" plain="true">btn4</button>
			<button type="primary" plain="true">btn5</button>
			<!-- <image src="../../static/logo.png"></image> -->
		</view>

		<view style="text-align: center;">
			<text>Hello World</text>
			<!-- <view ref="input" class="input"> -->

			<!-- </view> -->
		</view>


		<view>
			<text>222</text>
		</view>

		<hr />

		<!-- <view>
			<list pagingEnabled = true>
				<!-- 注意事项: 不能使用 index 作为 key 的唯一标识 -->
		<!-- <cell v-for="(item, index) in list" :key="item.id">
					<text>{{item.id}}</text>
				</cell>
			</list>
		</view> -->

		<!-- <view class="uni-list">
			<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,index) in list" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right">
					{{item}}
				</view>
			</view>
		</view> -->
		<!-- <view v-for="(item,index) in list" :key="index">
			<text>{{ item }}</text>
		</view> -->

		<!-- 	<view>
			<view class="uni-title uni-common-pl">地区选择器</view>
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						当前选择
					</view>
					<view class="uni-list-cell-db">
						<picker mode=multiSelector @change="bindPickerChange" :value="index" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
				</view>

			</view>
		</view> -->

		<!-- <view>
			<button class="btns" type="primary" @tap="openAddres">默认打开地址</button>

			<button class="btns" type="default" @tap="openAddres2">自定义：根据省市区名称打开地址</button>

			<button class="btns" type="warn" @tap="openAddres3">自定义：根据省市区“code”打开地址</button>
			<textarea v-model="pickerText" cols="30" rows="10"></textarea> -->
		<!--
				         mask-bg-color="rgba(0, 229, 238, 0.4)" // 自定义遮罩层背景颜色
				         -->
		<!-- <simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
		</view> -->

		<view class="uni-title uni-common-pl">日期选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>

		<view>

			<view class="uni-padding-wrap">
				<view class="uni-title">日期：{{year}}年{{month}}月{{day}}日</view>
			</view>
			<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="valueList" @change="bindChange">
				<picker-view-column>
					<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
				</picker-view-column>
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>

	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import helper from "../../common/utils.js"
	import HttpHelper from "../../common/HttpHelper.js"
	// import uniList from "@/components/uni-list/uni-list.vue"
	// import uniListItem from "@/components/uni-list-item/uni-list-item.vue"

	export default {
		components: {
			// uniList,
			// uniListItem
			simpleAddress
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		mounted() {
			// 创建附件上传
			// var _self = this;
			// var input = document.createElement('input'); //创建元素
			// input.type = 'file' //添加file类型
			// input.onchange = (event) => {
			// 	// _self.upFile(input, event)
			// 	console.log(input.files[0])
			// }
			// this.$refs.input.$el.appendChild(input)
			console.log("mounted")
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})

			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				date: currentDate,
				list: [{
						id: "1",
						name: 'A'
					}, {
						id: "2",
						name: 'B'
					}, {
						id: "3",
						name: 'C'
					},
					{
						id: "4",
						name: 'A'
					}, {
						id: "5",
						name: 'B'
					}, {
						id: "6",
						name: 'C'
					}
				],
				array: [
					['中国', '美国', '巴西', '日本'],
					["北京", "neyue"]
				],
				cityPickerValueDefault: [0, 0, 1],
				pickerText: '',
				years,
				year,
				months,
				month,
				days,
				day,
				valueList: [9999, month - 1, day - 1],
				visible: true,
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		onLoad() {
			console.log("onLoad");

		},


		methods: {
		
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindChange(e) {
				var val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]


				console.log("this.valueList==", this.valueList)


			},
			openAddres() {
				this.cityPickerValueDefault = [0, 0, 1]
				this.$refs.simpleAddress.open();
			},
			openAddres2() {
				// 根据 label 获取
				var index = this.$refs.simpleAddress.queryIndex(['湖北省', '随州市', '曾都区'], 'label');

				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
				console.log(index);
			},
			openAddres3() {
				// 根据value 获取
				var index = this.$refs.simpleAddress.queryIndex([13, 1302, 130203], 'value');

				this.cityPickerValueDefault = index.index;
				this.$refs.simpleAddress.open();
				console.log(index);
			},
			onConfirm(e) {
				this.pickerText = JSON.stringify(e);
				console.log(JSON.stringify(e));
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				//this.index = e.target.value
			},
			back: function() {
				// uni.navigateBack()
				// helper.SayHello()
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.src = 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
				innerAudioContext.autoplay = true
				console.log(helper.GetPaltform())
				// #ifdef APP-PLUS
				console.log("H5")
				//  #endif
			},
			upFile(input, event) {
				var _self = this;
				uni.uploadFile({
					url: url,
					files: [{
						file: input.files[0],
						uri: event.srcElement.value
					}],
					success: (uploadFileRes) => {
						console.log(uploadFileRes)
					},
					fail: (err) => {
						console.log(err)
					}
				});
			},
			HttpGet: function() {
				console.log("HttpGet");
				var url = "https://192.168.65.172:5000/hello" //"http://pokerofroyal.com:8080/a/thaitexashotupiii/configrelease"
				HttpHelper.HttpGet(url, (data) => {

					if (data) {
						console.log(data[0])

						helper.ShowAlert("提示", "OK")
					} else {

						helper.ShowAlert("提示", "EROR")

					}
				})

			}

		}
	}
</script>

<style>
	picker-view {
		width: 100%;
		height: 600rpx;
		margin-top: 20rpx;
	}

	.item {
		line-height: 100rpx;
		text-align: center;
	}

	button {
		width: 200rpx;
		margin: 25rpx;
		text-align: center;
		font-size: 30rpx;

	}

	.mask {
		position: absolute;
		background-color: #000000;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;

	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		flex-wrap: wrap;
		width: 100%;

		/* background-color: #a64f4c; */


	}

	.content {
		display: flex;
		position: absolute;
		flex-direction: column;
		width: 100%;

		left: 0;
		top: 0;
		/* background-color: #f6e4ff; */
	}
</style>
