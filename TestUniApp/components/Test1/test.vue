<template>
	<view>
		 <button @click="Click">{{  name }}</button>
	</view>
</template>



<script>
	export default {
		name: 'test',
		props:["name"],
		methods: {
			
			Click:function()
			{
				
				this.$emit("BtnClick",2);
			}
			
		}
	}
</script>

<style>

</style>
