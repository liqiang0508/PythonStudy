<template>
	<view>
		 <button @click="Click">{{  name }}</button>
	</view>
</template>



<script>
	export default {
		
		props:["name"],
		methods: {
			
			Click:function()
			{
				console.log("子组件点击")
				this.$emit("BtnClick",2);
			}
			
		}
	}
</script>

<style>

</style>
